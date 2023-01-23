import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';

import { RequestUser, UserRole } from '../types';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionAnswerInput } from './dto/update-question-answer.input';
import { UpdateQuestionInput } from './dto/update-question.input';

@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}

  getWhereOptions(user: RequestUser, id?: number) {
    const whereOptions: Prisma.QuestionWhereInput = {};

    if (id) {
      whereOptions.id = id;
    }

    if (user && user.role === UserRole.CUSTOMER) {
      whereOptions.course = {
        users: {
          every: {
            id: user.sub,
          },
        },
      };
    }

    if (user.role === UserRole.INSTRUCTOR) {
      whereOptions.course = {
        instructors: {
          // TODO: it should be instructorId
          every: {
            id: user.sub,
          },
        },
      };
    }

    return whereOptions;
  }

  validateQuestion(id: number, user?: RequestUser) {
    return async (withDeleted = false) => {
      // TODO: add withDeleted
      const question = await this.prismaService.question.findFirst({
        where: this.getWhereOptions(user, id),
        include: {
          whoAnswered: true,
          whoAsked: true,
          course: true,
        },
      });

      if (!question) {
        throw new NotFoundException('Invalid question id.');
      }

      return question;
    };
  }

  async updateQuestionBuilder(id: number, input: Prisma.QuestionUpdateInput) {
    return await this.prismaService.question.update({
      where: {
        id,
      },
      data: input,
    });
  }

  async create({ question }: CreateQuestionInput, user: RequestUser) {
    return await this.prismaService.question.create({
      data: {
        question,
        answer: '',
        whoAsked: {
          connect: {
            id: user.sub,
          },
        },
      },
    });
  }

  async findAll(user: RequestUser) {
    return await this.prismaService.question.findMany({
      where: this.getWhereOptions(user),
      include: {
        whoAnswered: true,
        whoAsked: true,
        course: true,
      },
    });
  }

  async findOne(id: number, user: RequestUser) {
    return await this.validateQuestion(id, user)();
  }

  async updateQuestion(
    id: number,
    updateQuestionInput: UpdateQuestionInput,
    user: RequestUser
  ) {
    const question = await this.validateQuestion(id, user)();

    if (question.whoAsked.id !== user.sub) {
      throw new UnauthorizedException("You can't modify this question");
    }

    return await this.updateQuestionBuilder(id, updateQuestionInput);
  }

  async updateQuestionAnswer(
    id: number,
    updateQuestionAnswerInput: UpdateQuestionAnswerInput,
    user: RequestUser
  ) {
    const question = await this.validateQuestion(id, user)();

    if (question.whoAnswered.id !== user.sub) {
      throw new UnauthorizedException("You can't modify this question");
    }

    return await this.updateQuestionBuilder(id, updateQuestionAnswerInput);
  }

  async remove(id: number) {
    await this.validateQuestion(id)();

    // TODO: make delete to soft delete
    return await this.prismaService.question.delete({
      where: {
        id,
      },
    });
  }

  // TODO: replace with prisma
  async restore(id: number) {
    const question = await this.validateQuestion(id)(true);

    return question;
  }
}
