import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CreateReviewInput } from "./dto/create-review.input";
import { RatingDTO } from "./dto/rating.dto";

@Injectable()
export class ReviewService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateReviewInput) {
		// First, verify the order exists
		const order = await this.prisma.order.findUnique({
			where: { id: data.orderId },
			include: { product: true },
		});

		if (!order) {
			throw new NotFoundException("Order not found");
		}

		// Check other business rules
		if (order.status !== "APPROVED") {
			throw new BadRequestException(
				"Cannot review an order that is not completed",
			);
		}

		return this.prisma.review.create({
			data: {
				sellerAddress: data.sellerAddress,
				reviewerAddress: data.reviewerAddress,
				rating: data.rating,
				comment: data.comment,
				orderId: data.orderId,
			},
		});
	}

	async findAllBySeller(sellerAddress: string) {
		return this.prisma.review.findMany({
			where: {
				sellerAddress,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	async getAverageRatingBySeller(sellerAddress: string): Promise<RatingDTO> {
		const reviews = await this.prisma.review.findMany({
			where: {
				sellerAddress,
			},
			select: {
				rating: true,
			},
		});

		if (reviews.length === 0) {
			return {
				sellerAddress,
				averageRating: 0,
				totalReviews: 0,
			};
		}

		const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
		const average = sum / reviews.length;

		return {
			sellerAddress,
			averageRating: Number(average.toFixed(2)),
			totalReviews: reviews.length,
		};
	}
}
