import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@zeenzen/database';

import { RequestUser } from '../types';
import { CreateReportInput } from './dto/create-report.input';

@Injectable()
export class ReportService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateReport(id: number) {
    const report = await this.prismaService.report.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!report) {
      throw new NotFoundException('Invalid report id.');
    }

    return report;
  }

  async create({ title, content }: CreateReportInput, user: RequestUser) {
    return await this.prismaService.report.create({
      data: {
        title,
        content,
        user: {
          connect: {
            // TODO: check the functionality of none user request
            id: user.sub,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaService.report.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.validateReport(id);
  }
}
