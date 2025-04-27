import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Message {
	@Field(() => ID)
	id: string;

	@Field()
	orderId: string;

	@Field()
	senderAddress: string;

	@Field()
	content: string;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
