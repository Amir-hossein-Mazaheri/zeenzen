import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';

import { SignInInput } from './dto/sign-in.input';
import { LogoutMessage } from './dto/logout-message.dto';
import { SignUpInput } from './dto/sign-up.input';
import { PreSignUpInput } from './dto/pre-sign-up.input';
import { ValidatedEmail } from './entities/validated-email.entity';
import { RemovePreSignUpInput } from './dto/remove-pre-sign-up.input';
import { Cart } from '../cart/entities/cart.entity';
import { LogsService } from '../logs/logs.service';
import {
  Session,
  CallBackWithError,
  UserLogStatus,
  RequestUser,
} from '../types';
import { User } from '../user/entities/user.entity';
import { getCode } from '../utils/getCode';
import { getMailOptions } from '../utils/getMailOptions';
import { sendEmail } from '../utils/sendEmail';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(ValidatedEmail)
    private readonly validatedEmailRepository: Repository<ValidatedEmail>,
    private readonly jwtService: JwtService,
    private readonly logsService: LogsService,
    private readonly dataSource: DataSource
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

  async validateUser(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['instructor'],
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
    const whereOptions: FindOptionsWhere<ValidatedEmail> = { email };

    if (code) {
      whereOptions.code = code;
    }

    const validatedEmail = await this.validatedEmailRepository.findOneBy(
      whereOptions
    );

    if (!validatedEmail) {
      throw new UnauthorizedException("Your email isn't validated yet.");
    }

    return validatedEmail;
  }

  async signIn({ email }: SignInInput) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: {
          cart: true,
        },
      });

      if (!user.cart) {
        user.cart = new Cart();

        await this.userRepository.manager.save(user);
      }

      await this.logsService.logUser(user, UserLogStatus.LOGGED_IN);

      return user;
    } catch (err) {
      await this.logsService.logError('signIn', err);

      throw new InternalServerErrorException(
        'Something went wrong while trying to sign in.'
      );
    }
  }

  async preSignUp({ email }: PreSignUpInput) {
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new BadRequestException(
        'Another user is registered with this email.'
      );
    }

    const { code, expiresAt } = await getCode(5, 10);

    const newValidatedEmail = new ValidatedEmail();
    newValidatedEmail.email = email;
    newValidatedEmail.code = code.toString();
    newValidatedEmail.expiresAt = expiresAt;

    const subject = `وب سایت آموزشی ZeenZen - کد تایید ایمیل`;

    const html = `کد تایید ایمیل شما: ${code}`;

    await this.validatedEmailRepository.manager.save(newValidatedEmail);

    await sendEmail(getMailOptions(email, subject, html));

    return newValidatedEmail;
  }

  async removePreSignUpCode({ email }: RemovePreSignUpInput) {
    const validatedEmail = await this.validateEmailCode(email);

    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(ValidatedEmail)
      .where({ email })
      .execute();

    return validatedEmail;
  }

  async signUp({ email, password, code }: SignUpInput) {
    const validatedEmail = await this.validateEmailCode(email, code);

    if (validatedEmail.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Your code has been expired.');
    }

    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new Error('Email is duplicate.');
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = await argon2.hash(password);
    newUser.cart = new Cart();

    const savedUser = await this.userRepository.manager.save(newUser);

    return savedUser;
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
}
