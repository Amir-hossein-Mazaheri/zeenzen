import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PrismaService } from '@zeenzen/database';

import { ErrorLog } from './entities/error-log.entity';
import { UserLog } from './entities/user-log.entity';
import { UpdateErrorLogComment } from './dto/update-error-log-comment.input';
import { RequestUser, UserLogStatus } from '../types';
import { User } from '../user/entities/user.entity';
import { getServerPerformanceStatus } from '../utils/getServerPerformanceStatus';
import { toCamelCase } from '../utils/toCamelCase';
import { Prisma } from '@prisma/client';

@Injectable()
export class LogsService {
  constructor(
    // @InjectRepository(ErrorLog)
    // private errorLogRepository: Repository<ErrorLog>,
    // @InjectRepository(User)
    // private userRepository: Repository<User>,
    // @InjectRepository(UserLog)
    // private userLogRepository: Repository<UserLog>,
    // private dataSource: DataSource,
    private readonly prismaService: PrismaService
  ) {}

  async validateErrorLog(id: string) {
    const errorLog = await this.prismaService.errorLog.findUnique({
      where: { id },
    });

    // const errorLog = await this.errorLogRepository.findOneBy({
    //   id,
    // });

    if (!errorLog) {
      throw new NotFoundException('Invalid error log id.');
    }

    return errorLog;
  }

  async validateUserLog(id: string) {
    const userLog = await this.prismaService.userLog.findUnique({
      where: { id },
    });

    // const userLog = await this.userLogRepository.findOneBy({
    //   id,
    // });

    if (!userLog) {
      throw new NotFoundException('Invalid error log id.');
    }

    return userLog;
  }

  async findAllErrorLogs() {
    // return await this.errorLogRepository.find();
    return await this.prismaService.errorLog.findMany();
  }

  async findOneErrorLog(id: string) {
    return await this.validateErrorLog(id);
  }

  async findAllUserLogs() {
    // return await this.userLogRepository.find();
    return await this.prismaService.userLog.findMany();
  }

  async findOneUserLog(id: string) {
    return await this.validateUserLog(id);
  }

  async updateErrorLogComment({ errorLogId, comment }: UpdateErrorLogComment) {
    const errorLog = await this.validateErrorLog(errorLogId);

    errorLog.comment = comment;

    // await this.errorLogRepository.manager.save(errorLog);

    await this.prismaService.errorLog.update({
      where: { id: errorLog.id },
      data: errorLog,
    });

    return errorLog;
  }

  async removeErrorLog(id: string) {
    // const errorLog = await this.errorLogRepository
    //   .createQueryBuilder()
    //   .softDelete()
    //   .where({ id })
    //   .returning('*')
    //   .execute();

    // return toCamelCase(errorLog);

    return await this.prismaService.errorLog.delete({
      where: { id },
    });
  }

  async removeUserLog(id: string) {
    // const userLog = await this.userLogRepository
    //   .createQueryBuilder()
    //   .softDelete()
    //   .where({ id })
    //   .returning('*')
    //   .execute();

    // return toCamelCase(userLog);

    return await this.prismaService.userLog.delete({
      where: { id },
    });
  }

  // logs error into database
  async logError(action: string, error: Error) {
    // const newErrorLog = new ErrorLog();
    // newErrorLog.action = action;
    // newErrorLog.error = error as unknown as JSON;
    // newErrorLog.serverPerformanceStatus =
    //   getServerPerformanceStatus() as unknown as JSON;

    // await this.errorLogRepository.manager.save(newErrorLog);

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

    // const currUser = await this.userRepository.findOne({
    //   where: { id: userId },
    // });

    // const newUserLog = new UserLog();
    // newUserLog.user = currUser;
    // newUserLog.status = status;

    // await this.userLogRepository.manager.save(newUserLog);

    await this.prismaService.userLog.create({
      data: {
        status,
        user: { connect: { id: userId } },
      },
    });
  }
}
