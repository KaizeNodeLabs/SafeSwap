import { Field, ID, ObjectType } from "@nestjs/graphql";
import { $Enums } from "@prisma/client";
@ObjectType()
export class Product {
	@Field(() => ID)
	id: string;

	@Field(() => String)
	name: string;

	@Field(() => String)
	condition: $Enums.ProductCondition;

	@Field(() => String)
	sellerAddress: string;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}
