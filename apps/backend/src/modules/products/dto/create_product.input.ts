import { Field, Float, InputType } from "@nestjs/graphql";

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
}
