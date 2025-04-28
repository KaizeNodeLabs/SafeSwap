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
  productId: string;

  @Field()
  buyerAddress: string;

  @Field()
  sellerAddress: string;

  @Field()
  escrowId: string;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
