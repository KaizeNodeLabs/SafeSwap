import { Module } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ReviewResolver } from "./review.resolver";
import { ReviewService } from "./review.service";

@Module({
	providers: [ReviewResolver, ReviewService, PrismaService],
})
export class ReviewModule {}
