import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProductDTO {
	@Field(() => String)
	name: string;
}
