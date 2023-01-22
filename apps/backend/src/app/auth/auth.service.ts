import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from '@zeenzen/database';
import { Prisma } from '@prisma/client';

import { SignInInput } from './dto/sign-in.input';
import { LogoutMessage } from './dto/logout-message.dto';
import { SignUpInput } from './dto/sign-up.input';
import { PreSignUpInput } from './dto/pre-sign-up.input';
import { RemovePreSignUpInput } from './dto/remove-pre-sign-up.input';
import { LogsService } from '../logs/logs.service';
import {
  Session,
  CallBackWithError,
  UserLogStatus,
  RequestUser,
} from '../types';
import { getCode } from '../utils/getCode';
import { getMailOptions } from '../utils/getMailOptions';
import { sendEmail } from '../utils/sendEmail';

@Injectable()
export class AuthService {
  constructor(
    private readonly logsService: LogsService,
    private readonly prismaService: PrismaService
  ) {}

  destroySession = (session: Session) => {
    return new Promise<void>((resolve, reject) => {
      session.destroy((err: Error) => {
        if (!err) {
          resolve();
        }

        reject(err);
      });
    });
  };

  passportLogout(nativeLogout: CallBackWithError) {
    return new Promise<void>((resolve, reject) => {
      nativeLogout((err) => {
        if (!err) {
          resolve();
        }
        reject(err);
      });
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: {
        instructor: true,
      },
    });

    const isPasswordValid = user
      ? await argon2.verify(user.password, password)
      : false;

    if (user && isPasswordValid) {
      return user;
    }

    return null;
  }

  async validateEmailCode(email: string, code?: string) {
    const whereOptions: Prisma.ValidatedEmailWhereInput = { email };

    if (code) {
      whereOptions.code = code;
    }

    const validatedEmail = await this.prismaService.validatedEmail.findFirst({
      where: whereOptions,
    });

    if (!validatedEmail) {
      throw new UnauthorizedException("Your email isn't validated yet.");
    }

    return validatedEmail;
  }

  async signIn({ email }: SignInInput) {
    return await this.prismaService.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email },
        include: {
          cart: true,
        },
      });

      if (!user.cart) {
        await tx.cart.create({
          data: {
            user: {
              connect: { id: user.id },
            },
          },
        });
      }

      await this.logsService.logUser(user, UserLogStatus.LOGGED_IN);

      return user;
    });
  }

  async preSignUp({ email }: PreSignUpInput) {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (user) {
      throw new BadRequestException(
        'Another user is registered with this email.'
      );
    }

    const { code, expiresAt } = await getCode(5, 10);

    const newValidatedEmail = await this.prismaService.validatedEmail.create({
      data: {
        email,
        code: code.toString(),
        expiresAt,
      },
    });

    const subject = `وب سایت آموزشی ZeenZen - کد تایید ایمیل`;

    const html = `کد تایید ایمیل شما: ${code}`;

    await sendEmail(getMailOptions(email, subject, html));

    return newValidatedEmail;
  }

  async removePreSignUpCode({ email }: RemovePreSignUpInput) {
    await this.validateEmailCode(email);

    // it only delete one but only delete many supports email in where
    return await this.prismaService.validatedEmail.deleteMany({
      where: {
        email,
      },
    });
  }

  async signUp({ email, password, code }: SignUpInput) {
    const validatedEmail = await this.validateEmailCode(email, code);

    if (validatedEmail.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Your code has been expired.');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new Error('Email is duplicate.');
    }

    return await this.prismaService.user.create({
      data: {
        email,
        password: await argon2.hash(password),
        cart: {
          create: {},
        },
      },
    });
  }

  // logout first calls passport logout then destroy session and then it delete cookie
  async logout(ctx: any) {
    const request = ctx.req;
    const response = request.res;
    const user: RequestUser = request.user;
    const session = request.session;

    const logoutMessage = new LogoutMessage(user.sub, user.email, user.role);

    try {
      await this.passportLogout(ctx.req.logOut);

      await this.destroySession(session);

      response.clearCookie('connect.sid');

      logoutMessage.message = 'logged out successfully.';

      await this.logsService.logUser(user, UserLogStatus.LOGGED_OUT);

      return logoutMessage;
    } catch (err) {
      logoutMessage.message =
        'something went wrong while trying to log you out.';

      await this.logsService.logError('logout', err);

      return logoutMessage;
    }
  }

  async getSession() {
    //
  }
}
