import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
import { CreateReportInput } from './dto/create-report.input';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole, RequestUser } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { GetUser } from '../user/decorators/user.decorator';

@Roles(UserRole.ADMIN)
@Resolver(() => Report)
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Public()
  @Mutation(() => Report, { description: 'creates and returns report.' })
  createReport(
    @Args('createReportInput') createReportInput: CreateReportInput,
    @GetUser() user: RequestUser
  ) {
    return this.reportService.create(createReportInput, user);
  }

  @Query(() => [Report], {
    name: 'reports',
    description: 'returns all of reports(only for admins).',
  })
  findAll() {
    return this.reportService.findAll();
  }

  @Query(() => Report, {
    name: 'report',
    description: 'returns one of reports(only for admins).',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reportService.findOne(id);
  }
}
