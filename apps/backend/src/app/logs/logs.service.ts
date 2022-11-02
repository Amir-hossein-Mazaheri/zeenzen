import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { ErrorLog } from './entities/error-log.entity';
import { UserLog } from './entities/user-log.entity';
import { UpdateErrorLogComment } from './dto/update-error-log-comment.input';
import { RequestUser, UserLogStatus } from '../types';
import { User } from '../user/entities/user.entity';
import { getServerPerformanceStatus } from '../utils/getServerPerformanceStatus';
import { toCamelCase } from '../utils/toCamelCase';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(ErrorLog)
    private errorLogRepository: Repository<ErrorLog>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserLog)
    private userLogRepository: Repository<UserLog>,
    private dataSource: DataSource
  ) {}

  async validateErrorLog(id: string) {
    const errorLog = await this.errorLogRepository.findOneBy({
      id,
    });

    if (!errorLog) {
      throw new NotFoundException('Invalid error log id.');
    }

    return errorLog;
  }

  async validateUserLog(id: string) {
    const userLog = await this.userLogRepository.findOneBy({
      id,
    });

    if (!userLog) {
      throw new NotFoundException('Invalid error log id.');
    }

    return userLog;
  }

  async findAllErrorLogs() {
    return await this.errorLogRepository.find();
  }

  async findOneErrorLog(id: string) {
    return await this.validateErrorLog(id);
  }

  async findAllUserLogs() {
    return await this.userLogRepository.find();
  }

  async findOneUserLog(id: string) {
    return await this.validateUserLog(id);
  }

  async updateErrorLogComment({ errorLogId, comment }: UpdateErrorLogComment) {
    const errorLog = await this.validateErrorLog(errorLogId);

    errorLog.comment = comment;

    await this.errorLogRepository.manager.save(errorLog);

    return errorLog;
  }

  async removeErrorLog(id: string) {
    const errorLog = await this.errorLogRepository
      .createQueryBuilder()
      .softDelete()
      .where({ id })
      .returning('*')
      .execute();

    return toCamelCase(errorLog);
  }

  async removeUserLog(id: string) {
    const userLog = await this.userLogRepository
      .createQueryBuilder()
      .softDelete()
      .where({ id })
      .returning('*')
      .execute();

    return toCamelCase(userLog);
  }

  // logs error into database
  async logError(action: string, error: Error) {
    const newErrorLog = new ErrorLog();
    newErrorLog.action = action;
    newErrorLog.error = error as unknown as JSON;
    newErrorLog.serverPerformanceStatus =
      getServerPerformanceStatus() as unknown as JSON;

    await this.errorLogRepository.manager.save(newErrorLog);
  }

  // logs user log in or log out into database
  async logUser(user: RequestUser | User, status: UserLogStatus) {
    let userId: number;

    if (user instanceof User) {
      userId = user.id;
    } else {
      userId = user.sub;
    }

    const currUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    const newUserLog = new UserLog();
    newUserLog.user = currUser;
    newUserLog.status = status;

    await this.userLogRepository.manager.save(newUserLog);
  }
}
