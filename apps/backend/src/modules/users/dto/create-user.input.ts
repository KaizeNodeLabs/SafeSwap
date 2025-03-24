import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateUserInput {
	@Field()
	@IsString()
	wallet_address: string;

	@Field()
	@IsString()
	@MaxLength(20)
	name: string;

	@Field()
	@IsString()
	@MaxLength(50)
	surname: string;

	@Field()
	@IsEmail()
	@MaxLength(150)
	email: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	telegram_username?: string;

	@Field()
	@IsString()
	@MaxLength(100)
	country: string;

	@Field({ defaultValue: false })
	is_seller: boolean;
}
