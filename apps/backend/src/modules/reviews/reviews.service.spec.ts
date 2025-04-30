import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ProductCondition } from "@prisma/client";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CreateReviewInput } from "./dto/create-review.input";
import { ReviewService } from "./reviews.service";

describe("ReviewService", () => {
	let service: ReviewService;
	let prismaService: PrismaService;

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

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReviewService,
				{
					provide: PrismaService,
					useValue: {
						review: {
							create: jest.fn().mockResolvedValue(mockReview),
							findMany: jest.fn().mockResolvedValue(mockReviews),
						},
						order: {
							findUnique: jest.fn(),
						},
					},
				},
			],
		}).compile();

		service = module.get<ReviewService>(ReviewService);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("create", () => {
		it("should failed to create a review if order does not exist", async () => {
			const createReviewInput: CreateReviewInput = {
				sellerAddress: "0x123",
				reviewerAddress: "0x456",
				rating: 5,
				comment: "Great seller!",
				orderId: "non-existing-order-id",
			};

			jest.spyOn(prismaService.order, "findUnique").mockResolvedValue(null);
			await expect(service.create(createReviewInput)).rejects.toThrow(
				NotFoundException,
			);
			expect(prismaService.review.create).not.toHaveBeenCalled();
		});

		it("should create a review", async () => {
			const createReviewInput: CreateReviewInput = {
				sellerAddress: "0x123",
				reviewerAddress: "0x456",
				rating: 5,
				comment: "Great seller!",
				orderId: "valid-order-id",
			};

			// Mock the order lookup to return a valid order
			jest.spyOn(prismaService.order, "findUnique").mockResolvedValue({
				id: "valid-order-id",
				productId: "123e4567-e89b-12d3-a456-426614174000",
				buyerAddress: "0x456",
				sellerAddress: "0x123",
				escrowId: "escrow-123",
				status: "APPROVED",
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			const result = await service.create(createReviewInput);

			expect(result).toEqual(mockReview);

			expect(prismaService.order.findUnique).toHaveBeenCalledWith({
				where: { id: "valid-order-id" },
				include: { product: true },
			});

			expect(prismaService.review.create).toHaveBeenCalledWith({
				data: createReviewInput,
			});
		});

		describe("findAllBySeller", () => {
			it("should return reviews for a seller", async () => {
				const result = await service.findAllBySeller("0x123");

				expect(result).toEqual(mockReviews);
				expect(prismaService.review.findMany).toHaveBeenCalledWith({
					where: { sellerAddress: "0x123" },
					orderBy: { createdAt: "desc" },
				});
			});
		});

		describe("getAverageRatingBySeller", () => {
			it("should return average rating for a seller", async () => {
				jest.spyOn(prismaService.review, "findMany").mockResolvedValueOnce([
					{
						rating: 5,
						id: "",
						sellerAddress: "",
						createdAt: undefined,
						updatedAt: undefined,
						reviewerAddress: "",
						orderId: "",
						comment: "",
					},
					{
						rating: 4,
						id: "",
						sellerAddress: "",
						reviewerAddress: "",
						orderId: "",
						comment: "",
						createdAt: undefined,
						updatedAt: undefined,
					},
				]);

				const result = await service.getAverageRatingBySeller("0x123");

				expect(result).toEqual({
					sellerAddress: "0x123",
					averageRating: 4.5,
					totalReviews: 2,
				});
			});

			it("should return 0 if no reviews exist", async () => {
				jest.spyOn(prismaService.review, "findMany").mockResolvedValueOnce([]);

				const result = await service.getAverageRatingBySeller("0x123");

				expect(result).toEqual({
					sellerAddress: "0x123",
					averageRating: 0,
					totalReviews: 0,
				});
			});
		});
	});
});
