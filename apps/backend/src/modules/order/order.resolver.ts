import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';

@Resolver(() => Order)
export class OrderResolver {
	constructor(private readonly ordersService: OrderService) {}

	@Query(() => [Order], { name: 'getOrdersByBuyer' })
	getOrdersByBuyer(@Args('buyerAddress') buyerAddress: string) {
		return this.ordersService.findAllByBuyer(buyerAddress);
	}

	@Query(() => [Order], { name: 'getOrdersBySeller' })
	getOrdersBySeller(@Args('sellerAddress') sellerAddress: string) {
		return this.ordersService.findAllBySeller(sellerAddress);
	}

	@Query(() => Order, { name: 'getOrder' })
	getOrder(@Args('orderId') orderId: string) {
		return this.ordersService.findOne(orderId);
	}

	@Mutation(() => Order)
	createOrder(@Args('data') data: CreateOrderInput) {
		return this.ordersService.create(data);
	}

	@Mutation(() => Order)
	updateOrderStatus(@Args('data') data: UpdateOrderStatusInput) {
		return this.ordersService.updateStatus(data.orderId, data.status);
	}
}
