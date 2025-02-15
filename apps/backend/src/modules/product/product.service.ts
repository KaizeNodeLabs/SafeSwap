import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CreateProductInput } from "./dto/create-product.input";
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
	async create(data: CreateProductInput): Promise<ProductDTO> {
		return this.prisma.product.create({ data });
	}
}
