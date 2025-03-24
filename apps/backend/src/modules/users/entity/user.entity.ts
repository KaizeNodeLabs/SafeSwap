import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
	@Field()
	wallet_address: string;

	@Field()
	name: string;

	@Field()
	surname: string;

	@Field()
	email: string;

	@Field({ nullable: true })
	telegram_username?: string;

	@Field()
	country: string;

	@Field()
	is_seller: boolean;

	@Field()
	created_at: Date;

	@Field()
	updated_at: Date;
}
