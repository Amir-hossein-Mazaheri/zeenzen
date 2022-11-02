import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
