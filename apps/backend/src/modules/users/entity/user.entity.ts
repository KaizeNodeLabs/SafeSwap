import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
	@Field()
	walletAddress: string;

	@Field()
	name: string;

	@Field()
	surname: string;

	@Field()
	email: string;

	@Field({ nullable: true })
	telegramUsername?: string;

	@Field()
	country: string;

	@Field()
	isSeller: boolean;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
