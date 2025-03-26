import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async findAll() {
		return this.prisma.user.findMany();
	}

	async findOne(walletAddress: string) {
		const user = await this.prisma.user.findUnique({
			where: { walletAddress },
		});
		if (!user) {
			throw new NotFoundException(
				`User with wallet address ${walletAddress} not found.`,
			);
		}
		return user;
	}

	async create(data: Prisma.UserCreateInput) {
		return this.prisma.user.create({ data });
	}

	async update(walletAddress: string, data: Prisma.UserUpdateInput) {
		const user = await this.prisma.user.findUnique({
			where: { walletAddress },
		});
		if (!user) {
			throw new NotFoundException(
				`User with wallet address ${walletAddress} not found.`,
			);
		}

		return this.prisma.user.update({
			where: { walletAddress },
			data,
		});
	}
}
