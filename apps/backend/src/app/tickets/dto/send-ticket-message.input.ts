import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SendTicketMessageInput {
  @Field(() => ID)
  @IsNotEmpty()
  ticketId: number;

  @Field(() => String)
  @IsNotEmpty()
  message: string;
}
