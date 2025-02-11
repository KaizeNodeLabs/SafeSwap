import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ProductImageDTO {
    @Field(() => String)
    imageUrl: string;

    @Field(() => String)
    productId: string;
}
