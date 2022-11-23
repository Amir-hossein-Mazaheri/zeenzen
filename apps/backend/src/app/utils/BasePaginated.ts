import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BasePaginated {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  count: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Boolean)
  hasNext: boolean;

  @Field(() => Boolean)
  hasPrev: boolean;
}
