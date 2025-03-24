import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async findAll() {
		return this.prisma.user.findMany();
	}

	async findOne(wallet_address: string) {
		return this.prisma.user.findUnique({
			where: { wallet_address },
		});
	}

	async create(data: Prisma.UserCreateInput) {
		return this.prisma.user.create({ data });
	}

	async update(wallet_address: string, data: Prisma.UserUpdateInput) {
		return this.prisma.user.update({
			where: { wallet_address },
			data,
		});
	}
}
