import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrismaService } from '@zeenzen/database';
import { Repository } from 'typeorm';

import { RequestUser } from '../types';
import { UserService } from '../user/user.service';
import { CreateReportInput } from './dto/create-report.input';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    // @InjectRepository(Report)
    // private readonly reportRepository: Repository<Report>,
    // private readonly userService: UserService,
    private readonly prismaService: PrismaService
  ) {}

  async validateReport(id: number) {
    // const report = await this.reportRepository.findOne({
    //   where: { id },
    //   relations: ['user'],
    // });

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
    // const newReport = new Report();
    // newReport.title = title;
    // newReport.content = content;

    // if (user) {
    //   newReport.user = await this.userService.validateUser(user.sub);
    // }

    // await this.reportRepository.manager.save(newReport);

    // return newReport;

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
    // return await this.reportRepository.find({ relations: ['user'] });
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
