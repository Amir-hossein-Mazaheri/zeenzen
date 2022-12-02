import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';

import { RequestUser } from '../types';
import { CreateQuestionHubQuestionInput } from './dto/create-question-hub-question.input';
import { AnswerQuestionHubQuestionInput } from './dto/answer-question-hub-question.input';
import { purifiedTurndown } from '../utils/purifiedTurndown';

@Injectable()
export class QuestionHubService {
  constructor(private readonly prismaService: PrismaService) {}

  validateQuestionHub(id: string) {
    return async (userId?: number) => {
      const questionHubWhereOptions: Prisma.QuestionHubWhereInput = { id };

      if (userId) {
        questionHubWhereOptions.course = {
          users: {
            some: {
              id: userId,
            },
          },
        };
      }

      const questionHub = await this.prismaService.questionHub.findFirst({
        where: questionHubWhereOptions,
      });

      if (!questionHub) {
        throw new NotFoundException('Invalid question hub id.');
      }

      return questionHub;
    };
  }

  async validateQuestionHubQuestion(id: number) {
    const questionHubQuestion =
      await this.prismaService.questionHubQuestion.findUnique({
        where: {
          id,
        },
        include: {
          answers: {
            include: {
              whoAnswered: true,
            },
          },
        },
      });

    if (!questionHubQuestion) {
      throw new NotFoundException('Invalid question hub question id.');
    }

    return questionHubQuestion;
  }

  async createQuestion(
    { hubId, title, description }: CreateQuestionHubQuestionInput,
    user: RequestUser
  ) {
    const hub = await this.validateQuestionHub(hubId)(user.sub);

    return await this.prismaService.questionHubQuestion.create({
      data: {
        title,
        description: purifiedTurndown(description),

        hub: {
          connect: hub,
        },

        whoAsked: {
          connect: {
            id: user.sub,
          },
        },
      },
    });
  }

  async answerQuestion(
    { questionId, answer }: AnswerQuestionHubQuestionInput,
    user: RequestUser
  ) {
    await this.validateQuestionHubQuestion(questionId);

    return await this.prismaService.questionHubAnswer.create({
      data: {
        answer: purifiedTurndown(answer),

        whoAnswered: {
          connect: {
            id: user.sub,
          },
        },

        question: {
          connect: {
            id: questionId,
          },
        },
      },
    });
  }
}
