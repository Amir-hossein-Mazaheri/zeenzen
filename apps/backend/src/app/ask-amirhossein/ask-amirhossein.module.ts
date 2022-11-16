import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { AskAmirhosseinService } from './ask-amirhossein.service';
import { AskAmirhosseinResolver } from './ask-amirhossein.resolver';
import { AskAmirhossein } from './entities/ask-amirhossein.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AskAmirhossein]),
    UserModule,
    DatabaseModule,
  ],
  providers: [AskAmirhosseinResolver, AskAmirhosseinService],
})
export class AskAmirhosseinModule {}
