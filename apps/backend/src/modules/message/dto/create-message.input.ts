import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  orderId: string;

  @Field()
  senderAddress: string;

  @Field()
  content: string;
}
