import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, DatabaseModule],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
