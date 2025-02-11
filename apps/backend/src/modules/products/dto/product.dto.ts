import { Field, Float, ID, ObjectType } from "@nestjs/graphql";

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

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}
