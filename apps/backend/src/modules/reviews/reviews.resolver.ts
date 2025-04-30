import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateReviewInput } from "./dto/create-review.input";
import { RatingDTO } from "./dto/rating.dto";
import { Review } from "./entities/review.entity";
import { ReviewService } from "./reviews.service";

@Resolver(() => Review)
export class ReviewResolver {
	constructor(private readonly reviewService: ReviewService) {}

	@Query(() => [Review])
	async getReviewsBySeller(@Args("sellerAddress") sellerAddress: string) {
		return this.reviewService.findAllBySeller(sellerAddress);
	}

	@Query(() => RatingDTO)
	async getAverageRatingBySeller(@Args("sellerAddress") sellerAddress: string) {
		return this.reviewService.getAverageRatingBySeller(sellerAddress);
	}

	@Mutation(() => Review)
	async createReview(@Args("data") data: CreateReviewInput) {
		return this.reviewService.create(data);
	}
}
