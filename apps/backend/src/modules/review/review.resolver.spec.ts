import { Test, TestingModule } from "@nestjs/testing";
import { CreateReviewInput } from "./dto/create-review.input";
import { ReviewResolver } from "./review.resolver";
import { ReviewService } from "./review.service";

describe("ReviewResolver", () => {
	let resolver: ReviewResolver;
	let reviewService: ReviewService;

	const mockReview = {
		id: "1",
		sellerAddress: "0x123",
		reviewerAddress: "0x456",
		rating: 5,
		comment: "Great seller!",
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const mockReviews = [
		mockReview,
		{
			id: "2",
			sellerAddress: "0x123",
			reviewerAddress: "0x789",
			rating: 4,
			comment: "Good transaction",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];

	const mockRating = {
		sellerAddress: "0x123",
		averageRating: 4.5,
		totalReviews: 2,
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReviewResolver,
				{
					provide: ReviewService,
					useValue: {
						create: jest.fn().mockResolvedValue(mockReview),
						findAllBySeller: jest.fn().mockResolvedValue(mockReviews),
						getAverageRatingBySeller: jest.fn().mockResolvedValue(mockRating),
					},
				},
			],
		}).compile();

		resolver = module.get<ReviewResolver>(ReviewResolver);
		reviewService = module.get<ReviewService>(ReviewService);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});

	describe("getReviewsBySeller", () => {
		it("should return reviews for a seller", async () => {
			const result = await resolver.getReviewsBySeller("0x123");

			expect(result).toEqual(mockReviews);
			expect(reviewService.findAllBySeller).toHaveBeenCalledWith("0x123");
		});
	});

	describe("getAverageRatingBySeller", () => {
		it("should return average rating for a seller", async () => {
			const result = await resolver.getAverageRatingBySeller("0x123");

			expect(result).toEqual(mockRating);
			expect(reviewService.getAverageRatingBySeller).toHaveBeenCalledWith(
				"0x123",
			);
		});
	});

	describe("createReview", () => {
		it("should create a review", async () => {
			const createReviewInput: CreateReviewInput = {
				sellerAddress: "0x123",
				reviewerAddress: "0x456",
				rating: 5,
				comment: "Great seller!",
				orderId: "valid-order-id",
			};

			const result = await resolver.createReview(createReviewInput);

			expect(result).toEqual(mockReview);
			expect(reviewService.create).toHaveBeenCalledWith(createReviewInput);
		});
	});
});
