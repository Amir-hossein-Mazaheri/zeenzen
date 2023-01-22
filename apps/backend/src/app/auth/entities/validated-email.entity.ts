import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ValidatedEmail {
  @Field(() => Int, { description: 'validated email id.' })
  id: number;

  @Field(() => String, { description: 'validated email.' })
  email: string;

  code: string;

  @Field(() => Date, { description: 'validation expiration date.' })
  expiresAt: Date;
}
