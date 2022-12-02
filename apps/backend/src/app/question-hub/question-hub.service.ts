import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@zeenzen/database';

import { CreateQuestionHubQuestionInput } from './dto/create-question-hub-question.input';
import { RequestUser } from '../types';

@Injectable()
export class QuestionHubService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateQuestionHub(id: string) {
    const questionHub = await this.prismaService.questionHub.findUnique({
      where: {
        id,
      },
    });

    if (!questionHub) {
      throw new NotFoundException('Invalid question hub id.');
    }

    return questionHub;
  }

  async createQuestion(
    { hubId, title, description }: CreateQuestionHubQuestionInput,
    user: RequestUser
  ) {
    const hub = await this.validateQuestionHub(hubId);

    return await this.prismaService.questionHubQuestion.create({
      data: {
        title,
        description,
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
}
