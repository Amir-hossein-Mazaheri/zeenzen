import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { RequestUser, UserRole } from '../types';
import { User } from '../user/entities/user.entity';
import { toCamelCase } from '../utils/toCamelCase';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionAnswerInput } from './dto/update-question-answer.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  private readonly relations = ['whoAnswered', 'whoAsked', 'course'];

  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
    private readonly prismaService: PrismaService
  ) {}

  getWhereOptions(user: RequestUser, id?: number) {
    // const whereOptions: FindOptionsWhere<Question> = {};

    // if (id) {
    //   whereOptions.id = id;
    // }

    // if (user && user.role == UserRole.CUSTOMER) {
    //   whereOptions.course = { participants: { id: user.sub } };
    // }

    // if (user.role === UserRole.INSTRUCTOR) {
    //   whereOptions.course = { instructors: { id: user.sub } };
    // }

    const whereOptions: Prisma.QuestionWhereInput = {};

    if (id) {
      whereOptions.id = id;
    }

    if (user && user.role === UserRole.CUSTOMER) {
      whereOptions.course = {
        // TODO: add participants
      };
    }

    if (user.role === UserRole.INSTRUCTOR) {
      whereOptions.course = {
        // TODO: add instructors
      };
    }

    return whereOptions;
  }

  validateQuestion(id: number, user?: RequestUser) {
    return async (withDeleted = false) => {
      // const question = await this.questionRepository.findOne({
      //   where: this.getWhereOptions(user, id),
      //   relations: this.relations,
      //   withDeleted,
      // });

      // TODO: add withDeleted
      const question = await this.prismaService.question.findFirst({
        where: this.getWhereOptions(user, id),
        include: {
          // TODO: adds relations
        },
      });

      if (!question) {
        throw new NotFoundException('Invalid question id.');
      }

      return question;
    };
  }

  async updateQuestionBuilder(id: number, input: Prisma.QuestionUpdateInput) {
    // const updatedQuestion = await this.dataSource
    //   .createQueryBuilder()
    //   .update<Question>(Question)
    //   .set(input)
    //   .where({ id })
    //   .returning('*')
    //   .execute();

    // return toCamelCase(updatedQuestion);

    return await this.prismaService.question.update({
      where: {
        id,
      },
      data: input,
    });
  }

  async create({ question }: CreateQuestionInput, user: RequestUser) {
    // const currUser = await this.userRepository.findOneBy({ id: user.sub });
    // const newQuestion = new Question();
    // newQuestion.question = question;
    // newQuestion.whoAsked = currUser;

    // await this.questionRepository.manager.save(newQuestion);

    // return newQuestion;

    return await this.prismaService.question.create({
      data: {
        question,
        answer: '',
        // TODO: fix whoAsked
        // whoAskedId: user.sub
      },
    });
  }

  async findAll(user: RequestUser) {
    // return await this.questionRepository.find({
    //   where: this.getWhereOptions(user),
    //   relations: this.relations,
    // });
    return await this.prismaService.question.findMany({
      where: this.getWhereOptions(user),
      // TODO: fix relations
      include: {},
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

    // TODO: fix whoAsked
    // if (question.whoAsked.id !== user.sub) {
    //   throw new UnauthorizedException("You can't modify this question");
    // }

    return await this.updateQuestionBuilder(id, updateQuestionInput);
  }

  async updateQuestionAnswer(
    id: number,
    updateQuestionAnswerInput: UpdateQuestionAnswerInput,
    user: RequestUser
  ) {
    const question = await this.validateQuestion(id, user)();

    // TODO: fix whoAnswered
    // if (question.whoAnswered.id !== user.sub) {
    //   throw new UnauthorizedException("You can't modify this question");
    // }

    return await this.updateQuestionBuilder(id, updateQuestionAnswerInput);
  }

  async remove(id: number) {
    await this.validateQuestion(id)();

    // await this.questionRepository
    //   .createQueryBuilder()
    //   .softDelete()
    //   .where({ id })
    //   .execute();

    // return question;

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

    await this.questionRepository
      .createQueryBuilder()
      .restore()
      .where({ id })
      .execute();

    return question;
  }
}
