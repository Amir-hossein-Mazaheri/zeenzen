import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestUser } from '../types';
import { UserService } from '../user/user.service';
import { CreateReportInput } from './dto/create-report.input';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    private readonly userService: UserService
  ) {}

  async validateReport(id: number) {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!report) {
      throw new NotFoundException('Invalid report id.');
    }

    return report;
  }

  async create({ title, content }: CreateReportInput, user: RequestUser) {
    const newReport = new Report();
    newReport.title = title;
    newReport.content = content;

    if (user) {
      newReport.user = await this.userService.validateUser(user.sub);
    }

    await this.reportRepository.manager.save(newReport);

    return newReport;
  }

  async findAll() {
    return await this.reportRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    return await this.validateReport(id);
  }
}
