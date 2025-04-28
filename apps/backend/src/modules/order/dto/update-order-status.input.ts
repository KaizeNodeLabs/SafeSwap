import { InputType, Field } from '@nestjs/graphql';
import { OrderStatus } from '../entities/order.entity';

@InputType()
export class UpdateOrderStatusInput {
  @Field()
  orderId: string;

  @Field(() => OrderStatus)
  status: OrderStatus;
}