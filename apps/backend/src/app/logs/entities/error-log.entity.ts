import { ObjectType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class ErrorLog {
  @Field(() => String, { description: 'error log id.' })
  id: string;

  @Field(() => String, { description: 'action that caused error.' })
  action: string;

  @Field(() => GraphQLJSON, { description: 'error object.' })
  error: JSON;

  @Field(() => String, {
    description: 'comment about why error happened or how to fix it.',
  })
  comment: string;

  @Field(() => Date, { description: 'time that log is created.' })
  time: Date;

  deletedAt: Date;

  @Field(() => GraphQLJSON, { description: 'status of server cpu and memory.' })
  serverPerformanceStatus: JSON;
}
