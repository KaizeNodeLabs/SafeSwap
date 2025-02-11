import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ProductDTO } from "./dto/product.dto";

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll(): Promise<ProductDTO[]> {
		return this.prisma.product.findMany();
	}

	async findOne(id: string): Promise<ProductDTO | null> {
		return this.prisma.product.findUnique({ where: { id } });
	}
}
