import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { OrderStatus } from './entities/order.entity';
import { Args } from '@nestjs/graphql';

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	create(data: CreateOrderInput) {
		return this.prisma.order.create({
			data: {
				product_id: data.productId,
				buyer_address: data.buyerAddress,
				seller_address: data.sellerAddress,
				escrow_id: data.escrowId,
				status: data.status,
			},
		});
	}

	findAllByBuyer(buyerAddress: string) {
		return this.prisma.order.findMany({
			where: { buyer_address: buyerAddress },
		});
	}

	findAllBySeller(sellerAddress: string) {
		return this.prisma.order.findMany({
			where: { seller_address: sellerAddress },
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
