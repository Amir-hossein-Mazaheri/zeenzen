import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@zeenzen/database';

import { UpdateErrorLogComment } from './dto/update-error-log-comment.input';
import { RequestUser, UserLogStatus } from '../types';
import { getServerPerformanceStatus } from '../utils/getServerPerformanceStatus';

@Injectable()
export class LogsService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateErrorLog(id: string) {
    const errorLog = await this.prismaService.errorLog.findUnique({
      where: { id },
    });

    if (!errorLog) {
      throw new NotFoundException('Invalid error log id.');
    }

    return errorLog;
  }

  async validateUserLog(id: string) {
    const userLog = await this.prismaService.userLog.findUnique({
      where: { id },
    });

    if (!userLog) {
      throw new NotFoundException('Invalid error log id.');
    }

    return userLog;
  }

  async findAllErrorLogs() {
    return await this.prismaService.errorLog.findMany();
  }

  async findOneErrorLog(id: string) {
    return await this.validateErrorLog(id);
  }

  async findAllUserLogs() {
    return await this.prismaService.userLog.findMany();
  }

  async findOneUserLog(id: string) {
    return await this.validateUserLog(id);
  }

  async updateErrorLogComment({ errorLogId, comment }: UpdateErrorLogComment) {
    const errorLog = await this.validateErrorLog(errorLogId);

    errorLog.comment = comment;

    await this.prismaService.errorLog.update({
      where: { id: errorLog.id },
      data: errorLog,
    });

    return errorLog;
  }

  async removeErrorLog(id: string) {
    return await this.prismaService.errorLog.delete({
      where: { id },
    });
  }

  async removeUserLog(id: string) {
    return await this.prismaService.userLog.delete({
      where: { id },
    });
  }

  // logs error into database
  async logError(action: string, error: Error) {
    await this.prismaService.errorLog.create({
      data: {
        action,
        error: error as unknown as any,
        serverPerformanceStatus: getServerPerformanceStatus() as unknown as any,
      },
    });
  }

  // logs user log in or log out into database
  async logUser(user: RequestUser | { id: number }, status: UserLogStatus) {
    let userId: number;

    // checks wether user is RequestUser or not
    if ('sub' in user) {
      userId = user.sub;
    } else {
      userId = user.id;
    }

    await this.prismaService.userLog.create({
      data: {
        status,
        user: { connect: { id: userId } },
      },
    });
  }
}
