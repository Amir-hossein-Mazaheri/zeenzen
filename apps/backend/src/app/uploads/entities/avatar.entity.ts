import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Avatar {
  @Field(() => ID, { description: 'avatar id which is uuid.' })
  id: string;

  @Field(() => String, { description: 'avatar saved file name.' })
  name: string;

  @Field(() => String, { description: 'avatar original file name.' })
  originalName: string;

  @Field(() => String, { description: 'full url to avatar image.' })
  fullPath: string;

  @Field(() => Date, { description: 'avatar creation data.' })
  createdAt: Date;

  user: User;
}
