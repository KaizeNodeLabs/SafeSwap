import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RatingDTO {
	@Field()
	sellerAddress: string;

	@Field(() => Float)
	averageRating: number;

	@Field(() => Int)
	totalReviews: number;
}
