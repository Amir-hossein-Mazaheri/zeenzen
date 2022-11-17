import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User]),
    DatabaseModule,
  ],
  providers: [UserService, UserResolver],
  exports: [
    // TypeOrmModule,
    UserService,
  ],
})
export class UserModule {}
