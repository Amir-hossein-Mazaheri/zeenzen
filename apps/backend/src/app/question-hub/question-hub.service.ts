import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';

import { RequestUser } from '../types';
import { CreateQuestionHubQuestionInput } from './dto/create-question-hub-question.input';
import { AnswerQuestionHubQuestionInput } from './dto/answer-question-hub-question.input';
import { purifiedTurndown } from '../utils/purifiedTurndown';
import { UpdateQuestionHubAnswerInput } from './dto/update-question-hub-answer.input';

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

  validateQuestionHubAnswer(id: number) {
    return async (whoAnsweredId: number) => {
      const questionHubAnswerWhereOptions: Prisma.QuestionHubAnswerWhereInput =
        { id };

      if (whoAnsweredId) {
        questionHubAnswerWhereOptions.whoAnswered = {
          id: whoAnsweredId,
        };
      }

      const questionHubAnswer =
        await this.prismaService.questionHubAnswer.findFirst({
          where: questionHubAnswerWhereOptions,
        });

      if (!questionHubAnswer) {
        throw new NotFoundException('Invalid question hub answer id.');
      }

      return questionHubAnswer;
    };
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

  async updateAnswer(
    id: number,
    { answer }: UpdateQuestionHubAnswerInput,
    user: RequestUser
  ) {
    await this.validateQuestionHubAnswer(id)(user.sub);

    return await this.prismaService.questionHubAnswer.update({
      where: {
        id,
      },
      data: {
        answer: purifiedTurndown(answer),
      },
    });
  }
}
