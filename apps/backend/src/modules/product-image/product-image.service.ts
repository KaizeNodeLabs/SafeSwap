import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ProductImageDTO } from "./dto/product-image.input";

@Injectable()
export class ProductImageService {
	constructor(private readonly prisma: PrismaService) {}

	// Service to create product Image
	async createProductImage(data: ProductImageDTO) {
		return await this.prisma.productImage.create({ data });
	}

	async getAllProductImages() {
		const productImages = await this.prisma.productImage.findMany();
		if (productImages.length === 0) {
			return [];
		}
		return productImages;
	}

	async getAProductImage(id: string) {
		const productImage = await this.prisma.productImage.findUnique({
			where: { id },
		});

		if (!productImage) {
			throw new Error("Product image not found.");
		}

		return productImage;
	}
}
