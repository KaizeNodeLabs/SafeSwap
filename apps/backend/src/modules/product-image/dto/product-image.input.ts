import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProductImageDTO {
	@Field(() => String)
	imageUrl: string;

	@Field(() => String)
	productId: string;
}
