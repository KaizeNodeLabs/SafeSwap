import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/core/prisma/prisma.service";
import { CreateCategoryInput } from "./dto/create-category.input";

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	public async findAll() {
		return this.prisma.category.findMany();
	}

	public async findOne(id: string) {
		return this.prisma.category.findUnique({ where: { id } });
	}

	public async create(data: CreateCategoryInput) {
		return this.prisma.category.create({ data });
	}
}
