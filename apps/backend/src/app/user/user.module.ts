import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
