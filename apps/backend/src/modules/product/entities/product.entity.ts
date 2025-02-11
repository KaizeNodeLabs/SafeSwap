import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Product {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}
