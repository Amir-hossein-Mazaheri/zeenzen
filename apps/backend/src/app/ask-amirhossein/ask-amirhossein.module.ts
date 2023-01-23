import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { AskAmirhosseinService } from './ask-amirhossein.service';
import { AskAmirhosseinResolver } from './ask-amirhossein.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, DatabaseModule],
  providers: [AskAmirhosseinResolver, AskAmirhosseinService],
})
export class AskAmirhosseinModule {}
