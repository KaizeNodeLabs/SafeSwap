import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CreateMessageInput } from "./dto/create-message.input";

@Injectable()
export class MessageService {
	constructor(private readonly prisma: PrismaService) {}

	async sendMessage(data: CreateMessageInput) {
		return this.prisma.message.create({
			data: {
				orderId: data.orderId,
				senderAddress: data.senderAddress,
				content: data.content,
			},
		});
	}

	async getMessagesByOrder(orderId: string) {
		return this.prisma.message.findMany({
			where: { orderId: orderId },
			orderBy: { createdAt: "asc" },
		});
	}
}
