import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { IsStellarPublicKey } from "../validators/is-stellar-public-key.validator";

@InputType()
export class CreateUserInput {
	[key: string]: unknown;
	@Field()
	@IsString()
	@IsStellarPublicKey()
	walletAddress: string;

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
	telegramUsername?: string;

	@Field()
	@IsString()
	@MaxLength(100)
	country: string;

	@Field({ defaultValue: false })
	isSeller: boolean;
}
