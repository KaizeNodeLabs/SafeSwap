import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderStatus } from './entities/order.entity';

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	create(data: CreateOrderInput) {
		return this.prisma.order.create({
			data: {
				productId: data.productId,
				buyerAddress: data.buyerAddress,
				sellerAddress: data.sellerAddress,
				escrowId: data.escrowId,
				status: data.status,
			},
		});
	}

	findAllByBuyer(buyerAddress: string) {
		return this.prisma.order.findMany({
			where: { buyerAddress },
		});
	}

	findAllBySeller(sellerAddress: string) {
		return this.prisma.order.findMany({
			where: { sellerAddress },
		});
	}

	findOne(id: string) {
		return this.prisma.order.findUnique({ where: { id } });
	}

	updateStatus(orderId: string, status: OrderStatus) {
		return this.prisma.order.update({
			where: { id: orderId },
			data: { status },
		});
	}
}
