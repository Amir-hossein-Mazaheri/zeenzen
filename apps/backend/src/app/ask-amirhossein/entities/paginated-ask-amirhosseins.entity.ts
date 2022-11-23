import { Field, ObjectType } from '@nestjs/graphql';

import { BasePaginated } from '../../utils/BasePaginated';
import { AskAmirhossein } from './ask-amirhossein.entity';

@ObjectType()
export class PaginatedAskAmirhosseins extends BasePaginated {
  @Field(() => [AskAmirhossein])
  askAmirhosseins: AskAmirhossein[];
}
