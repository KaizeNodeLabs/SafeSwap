import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Product } from "../../product/entities/product.entity";

@ObjectType()
export class ProductImage {
	@Field(() => ID)
	id: string;

	@Field(() => String)
	imageUrl: string;

	@Field(() => String)
	productId: string;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}
