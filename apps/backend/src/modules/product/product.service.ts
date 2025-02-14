import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ProductDTO } from "./dto/create-product.input";

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async createProduct(data: ProductDTO) {
		return await this.prisma.product.create({ data });
	}
}
