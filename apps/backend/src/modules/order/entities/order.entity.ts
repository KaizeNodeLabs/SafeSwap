import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  PENDING = 'PENDING',
  ON_DISPUTE = 'ON_DISPUTE',
  FOR_REVIEW = 'FOR_REVIEW',
  APPROVED = 'APPROVED',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

@ObjectType()
export class Order {
  @Field()
  id: string;

  @Field()
  product_id: string;

  @Field()
  buyer_address: string;

  @Field()
  seller_address: string;

  @Field()
  escrow_id: string;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
