import { Args, ID, Query, Resolver } from '@nestjs/graphql';

import { UserRole, RequestUser } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { GetUser } from '../user/decorators/user.decorator';
import { License } from './entities/license.entity';
import { LicenseService } from './license.service';

@Roles(UserRole.CUSTOMER)
@Resolver(() => LicenseService)
export class LicenseResolver {
  constructor(private licenseService: LicenseService) {}

  @Query(() => License, {
    name: 'licenses',
    description: 'returns all of created licenses.',
  })
  findAll(@GetUser() user: RequestUser) {
    return this.licenseService.findAll(user);
  }

  @Query(() => License, {
    name: 'license',
    description: 'returns one of created licenses.',
  })
  findOne(
    @Args('id', { type: () => ID }) id: number,
    @GetUser() user: RequestUser
  ) {
    return this.licenseService.findOne(id, user);
  }
}
