import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';

import { RequestUser } from '../types';
import { CreateQuestionHubQuestionInput } from './dto/create-question-hub-question.input';
import { AnswerQuestionHubQuestionInput } from './dto/answer-question-hub-question.input';
import { purifiedTurndown } from '../utils/purifiedTurndown';
import { UpdateQuestionHubAnswerInput } from './dto/update-question-hub-answer.input';
import { UpdateQuestionHubQuestionInput } from './dto/update-question-hub-question.input';

@Injectable()
export class QuestionHubService {
  constructor(private readonly prismaService: PrismaService) {}

  validateQuestionHub(id: string) {
    return async (userId?: number, includeQuestions?: boolean) => {
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
        include: {
          questions: includeQuestions,
        },
      });

      if (!questionHub) {
        throw new NotFoundException('Invalid question hub id.');
      }

      return questionHub;
    };
  }

  validateQuestionHubQuestion(id: number) {
    return (whoAskedId?: number) =>
      async (userId?: number, includeAnswers?: boolean) => {
        const questionHubQuestionWhereOptions: Prisma.QuestionHubQuestionWhereInput =
          { id };

        // this checks whether whoAsked can edit question hub question
        if (whoAskedId) {
          questionHubQuestionWhereOptions.whoAsked = {
            id: whoAskedId,
          };
        }

        // this checks whether user can see the question hub question or not
        if (userId) {
          questionHubQuestionWhereOptions.hub = {
            course: {
              users: {
                some: {
                  id: userId,
                },
              },
            },
          };
        }

        const questionHubQuestion =
          await this.prismaService.questionHubQuestion.findFirst({
            where: questionHubQuestionWhereOptions,
            include: {
              answers: {
                include: {
                  whoAnswered: includeAnswers,
                },
              },
            },
          });

        if (!questionHubQuestion) {
          throw new NotFoundException('Invalid question hub question id.');
        }

        return questionHubQuestion;
      };
  }

  validateQuestionHubAnswer(id: number) {
    return async (whoAnsweredId?: number) => {
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
    await this.validateQuestionHubQuestion(questionId)()();

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

  async updateQuestion(
    id: number,
    { title, description }: UpdateQuestionHubQuestionInput,
    user: RequestUser
  ) {
    await this.validateQuestionHubQuestion(id)(user.sub)();

    // TODO: add notification when someone updates question hub question
    return await this.prismaService.questionHubQuestion.update({
      where: {
        id,
      },
      data: {
        title,
        description: purifiedTurndown(description),
      },
    });
  }

  async findAllUserRelated(user: RequestUser) {
    return await this.prismaService.questionHub.findMany({
      where: {
        course: {
          users: {
            some: {
              id: user.sub,
            },
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaService.questionHub.findMany();
  }

  async findOne(id: string, user: RequestUser) {
    return await this.validateQuestionHub(id)(user.sub, true);
  }

  async findOneQuestionHubQuestion(id: number, user: RequestUser) {
    return await this.validateQuestionHubQuestion(id)()(user.sub, true);
  }

  async findAllQuestionsHubQuestionsUserRelated(user: RequestUser) {
    return await this.prismaService.questionHubQuestion.findMany({
      where: {
        whoAsked: {
          id: user.sub,
        },
      },
    });
  }
}
