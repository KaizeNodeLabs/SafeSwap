import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { $Enums } from "@prisma/client";

@ObjectType()
export class ProductDTO {
	@Field(() => ID)
	id: string;

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

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}
