import { Field, Float, InputType } from "@nestjs/graphql";
import { $Enums } from "@prisma/client";

@InputType()
export class CreateProductInput {
	@Field()
	name: string;

	@Field()
	slug: string;

	@Field({ nullable: true })
	description?: string;

	@Field(() => Float)
	price: number;

	@Field()
	categoryId: string;

	@Field(() => String)
	condition: $Enums.ProductCondition;

	@Field()
	sellerAddress: string;
}
