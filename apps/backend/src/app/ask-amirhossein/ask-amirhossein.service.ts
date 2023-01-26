import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@zeenzen/database';
import { Prisma } from '@prisma/client';

import { CreateAskAmirhosseinInput } from './dto/create-ask-amirhossein.input';
import { UpdateAskAmirhosseinInput } from './dto/update-ask-amirhossein.input';
import { AnswerAskAmirhosseinInput } from './dto/answer-ask-amirhossein.input';
import { FindAllAskAmirhosseinInput } from './dto/find-all-ask-amirhossein.input';
import { FindOneAskAmirhosseinInput } from './dto/find-one-ask-amirhossein.input';
import { NotificationAction, RequestUser, UserRole } from '../types';
import { getMailOptions } from '../utils/getMailOptions';
import { sendEmail } from '../utils/sendEmail';
import { purifiedTurndown } from '../utils/purifiedTurndown';
import { NotificationsService } from '../notifications/notifications.service';

const ASK_AMIRHOSSEINS_PER_PAGE = 15;

@Injectable()
export class AskAmirhosseinService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationService: NotificationsService
  ) {}

  async getWhereOptions(email: string, user: RequestUser) {
    if (email) {
      const registeredUser = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (registeredUser && registeredUser.id !== user.sub) {
        throw new UnauthorizedException(
          "You can't see other registered users questions."
        );
      }
    }

    const whereOptions: Prisma.AskAmirhosseinWhereInput = {};

    if (!user) {
      whereOptions.email = email;
    } else if (user.role !== UserRole.ADMIN) {
      whereOptions.whoAsked = { id: user.sub };
    }

    return whereOptions;
  }

  validateAskAmirhossein(id: number) {
    return async (whereOptions?: Prisma.AskAmirhosseinWhereInput) => {
      const askAmirhossein = await this.prismaService.askAmirhossein.findFirst({
        where: {
          id,
          ...whereOptions,
        },
        include: {
          answers: {
            orderBy: [
              {
                likedUsers: {
                  _count: 'desc',
                },
              },
              {
                createdAt: 'desc',
              },
            ],
            include: {
              whoAnswered: {
                include: {
                  avatar: true,
                },
              },
              _count: {
                select: {
                  likedUsers: true,
                },
              },
            },
          },
        },
      });

      if (!askAmirhossein) {
        throw new NotFoundException('Invalid ask amirhossein id.');
      }

      return {
        ...askAmirhossein,
        answers: askAmirhossein.answers.map((answer) => ({
          ...answer,
          likesCount: answer._count.likedUsers,
        })),
      };
    };
  }

  async create(
    { title, email, fullName, description }: CreateAskAmirhosseinInput,
    user: RequestUser
  ) {
    const createAskAmirhosseinData: Prisma.AskAmirhosseinCreateArgs = {
      data: {
        title,
        description,
        email,
        fullName,
      },
    };

    if (user) {
      createAskAmirhosseinData.data.whoAsked = {
        connect: {
          email: user.email,
        },
      };
    }

    await this.notificationService.pushNotification(
      `سوال جدیدی در از امیرحسین ثبت شده است.`,
      NotificationAction.OTHER,
      user
    )(true);

    return await this.prismaService.askAmirhossein.create(
      createAskAmirhosseinData
    );
  }

  // answer ask amirhossein flow:
  // 1. validate ask amirhossein id
  // 2. validate that the "ask amirhossein" question is not answered
  // 3. update ask amirhossein record answer and answeredAt
  // 4. send email to target email
  // 5. saved the updated ask amirhossein record
  // 6. return the saved ask amirhossein record
  async answer(
    id: number,
    { answer, fullName }: AnswerAskAmirhosseinInput,
    user: RequestUser
  ) {
    const askAmirhossein = await this.validateAskAmirhossein(id)();

    const subject = `ZeenZen - از امیرحسین بپرس - یک نفر به سوال ${askAmirhossein.title} پاسخ داده است`;

    await sendEmail(getMailOptions(askAmirhossein.email, subject, answer));

    return await this.prismaService.askAmirhossein.update({
      where: { id: askAmirhossein.id },
      data: {
        answers: {
          create: [
            {
              answer: purifiedTurndown(answer), //supports html
              fullName,
              whoAnswered: {
                connect: {
                  id: user.sub,
                },
              },
            },
          ],
        },
      },
    });
  }

  async removeLike(
    id: number,
    user: RequestUser,
    transaction: Prisma.TransactionClient
  ) {
    return await transaction.askAmirhosseinAnswer.update({
      where: {
        id,
      },
      data: {
        likedUsers: {
          disconnect: {
            id: user.sub,
          },
        },
      },
    });
  }

  async likeAnswer(id: number, user: RequestUser) {
    return await this.prismaService.$transaction(async (tx) => {
      const lU = await tx.askAmirhosseinAnswer.findUnique({
        where: {
          id,
        },
        include: {
          whoAnswered: true,
        },
      });

      console.log('liked user: ', lU);

      if (lU.whoAnswered.id === user.sub) {
        throw new BadRequestException("You can't like your own answer.");
      }

      const likedUser = await tx.askAmirhosseinAnswer.findFirst({
        where: {
          id,
          likedUsers: {
            some: {
              id: user.sub,
            },
          },
        },
      });

      if (likedUser) {
        return await this.removeLike(id, user, tx);
      }

      return await tx.askAmirhosseinAnswer.update({
        where: {
          id,
        },
        data: {
          likedUsers: {
            connect: [
              {
                id: user.sub,
              },
            ],
          },
        },
      });
    });
  }

  async findAll(page?: number) {
    const currPage = page || 1;

    const count = await this.prismaService.askAmirhossein.count();

    const askAmirhosseins = await this.prismaService.askAmirhossein.findMany({
      // where: {
      //   isPublished: true,
      // },
      take: ASK_AMIRHOSSEINS_PER_PAGE,
      skip: (currPage - 1) * ASK_AMIRHOSSEINS_PER_PAGE,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        answers: true,
      },
    });

    const totalPages = Math.ceil(count / ASK_AMIRHOSSEINS_PER_PAGE);

    const hasPrev = currPage !== 1;
    const hasNext = currPage < totalPages;

    return {
      page: currPage,
      count,
      totalPages,
      hasPrev,
      hasNext,
      askAmirhosseins,
    };
  }

  async findAllUserRelated(
    findAllAskAmirhosseinInput: FindAllAskAmirhosseinInput,
    user: RequestUser
  ) {
    return await this.prismaService.askAmirhossein.findMany({
      where: await this.getWhereOptions(
        findAllAskAmirhosseinInput?.email,
        user
      ),
    });
  }

  async findOne(
    id: number,
    findOneAskAmirhosseinInput: FindOneAskAmirhosseinInput,
    user: RequestUser
  ) {
    return await this.validateAskAmirhossein(id)();
  }

  async updateAnswer(
    id: number,
    updateAskAmirhosseinInput: UpdateAskAmirhosseinInput
  ) {
    const { email } = await this.validateAskAmirhossein(id)();

    const subject = ``;

    await sendEmail(
      getMailOptions(email, subject, updateAskAmirhosseinInput.answer)
    );

    return await this.prismaService.askAmirhossein.update({
      where: {
        id,
      },
      data: updateAskAmirhosseinInput,
    });
  }
}
