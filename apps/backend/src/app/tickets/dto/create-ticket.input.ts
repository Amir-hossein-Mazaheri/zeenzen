import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { TicketPriority, TicketTopic } from '../../types';

@InputType()
export class CreateTicketInput {
  @Field(() => String, { description: 'ticket title.' })
  @IsNotEmpty()
  title: string;

  @Field(() => String, { description: 'ticket description.' })
  @IsNotEmpty()
  description: string;

  @Field(() => String, { description: 'ticket topic which is an enum.' })
  @IsNotEmpty()
  topic: TicketTopic;

  @Field(() => String, { description: 'ticket priority which is an enum.' })
  @IsNotEmpty()
  priority: TicketPriority;
}
