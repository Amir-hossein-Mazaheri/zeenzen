import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zeenzen/database';

@Injectable()
export class QuestionHubService {
  constructor(private readonly prismaService: PrismaService) {}

  createQuestion(hubId: string) {
    return;
  }
}
