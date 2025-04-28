import { InputType, Field } from '@nestjs/graphql';
import { OrderStatus } from '../entities/order.entity';

@InputType()
export class CreateOrderInput {
  @Field()
  productId: string;

  @Field()
  buyerAddress: string;

  @Field()
  sellerAddress: string;

  @Field()
  escrowId: string;

  @Field(() => OrderStatus, { defaultValue: OrderStatus.PENDING })
  status: OrderStatus;
}
