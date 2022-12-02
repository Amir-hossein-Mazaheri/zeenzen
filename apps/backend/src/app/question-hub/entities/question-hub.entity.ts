import { Field, ObjectType } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';
import { QuestionHubQuestion } from './question-hub-question.entity';

@ObjectType()
export class QuestionHub {
  @Field(() => String, { description: 'question hub id which is uuid.' })
  id: string;

  @Field(() => Course, { description: 'related course.' })
  course: Course;

  @Field(() => [QuestionHubQuestion], { description: "hub's question." })
  questions: QuestionHubQuestion[];
}
