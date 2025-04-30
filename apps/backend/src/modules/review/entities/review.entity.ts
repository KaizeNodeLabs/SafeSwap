import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Review {
	@Field(() => ID)
	id: string;

	@Field()
	sellerAddress: string;

	@Field()
	reviewerAddress: string;

	@Field()
	orderId: string;

	@Field(() => Int)
	rating: number;

	@Field({ nullable: true })
	comment?: string;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}
