import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AskAmirhosseinService } from './ask-amirhossein.service';
import { AskAmirhosseinResolver } from './ask-amirhossein.resolver';
import { AskAmirhossein } from './entities/ask-amirhossein.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AskAmirhossein]), UserModule],
  providers: [AskAmirhosseinResolver, AskAmirhosseinService],
})
export class AskAmirhosseinModule {}
