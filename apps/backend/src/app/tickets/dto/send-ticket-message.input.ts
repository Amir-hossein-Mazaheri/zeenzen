import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SendTicketMessageInput {
  @Field(() => Int)
  @IsNotEmpty()
  ticketId: number;

  @Field(() => String)
  @IsNotEmpty()
  message: string;
}
