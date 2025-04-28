import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { OrderStatus } from './entities/order.entity';

describe('OrderService', () => {
	let service: OrderService;
	let prismaService: PrismaService;

	const mockPrismaService = {
		order: {
			create: jest.fn(),
			findMany: jest.fn(),
			findUnique: jest.fn(),
			update: jest.fn(),
		},
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrderService,
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		service = module.get<OrderService>(OrderService);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a new order', async () => {
			const orderData = {
				productId: 'product-123',
				buyerAddress: 'buyer-address-123',
				sellerAddress: 'seller-address-123',
				escrowId: 'escrow-123',
				status: OrderStatus.PENDING,
			};

			const expectedOrder = {
				id: 'order-123',
				productId: orderData.productId,
				buyerAddress: orderData.buyerAddress,
				sellerAddress: orderData.sellerAddress,
				escrowId: orderData.escrowId,
				status: orderData.status,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			mockPrismaService.order.create.mockResolvedValue(expectedOrder);

			const result = await service.create(orderData);

			expect(mockPrismaService.order.create).toHaveBeenCalledWith({
				data: {
					productId: orderData.productId,
					buyerAddress: orderData.buyerAddress,
					sellerAddress: orderData.sellerAddress,
					escrowId: orderData.escrowId,
					status: orderData.status,
				},
			});
			expect(result).toEqual(expectedOrder);
		});
	});

	describe('findAllByBuyer', () => {
		it('should return orders for a specific buyer', async () => {
			const buyerAddress = 'buyer-address-123';
			const mockOrders = [
				{
					id: 'order-123',
					productId: 'product-123',
					buyerAddress: buyerAddress,
					sellerAddress: 'seller-address-123',
					escrowId: 'escrow-123',
					status: OrderStatus.PENDING,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			];

			mockPrismaService.order.findMany.mockResolvedValue(mockOrders);

			const result = await service.findAllByBuyer(buyerAddress);

			expect(mockPrismaService.order.findMany).toHaveBeenCalledWith({
				where: { buyerAddress: buyerAddress },
			});
			expect(result).toEqual(mockOrders);
		});
	});

	describe('findAllBySeller', () => {
		it('should return orders for a specific seller', async () => {
			const sellerAddress = 'seller-address-123';
			const mockOrders = [
				{
					id: 'order-123',
					productId: 'product-123',
					buyerAddress: 'buyer-address-123',
					sellerAddress: sellerAddress,
					escrowId: 'escrow-123',
					status: OrderStatus.PENDING,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			];

			mockPrismaService.order.findMany.mockResolvedValue(mockOrders);

			const result = await service.findAllBySeller(sellerAddress);

			expect(mockPrismaService.order.findMany).toHaveBeenCalledWith({
				where: { sellerAddress: sellerAddress },
			});
			expect(result).toEqual(mockOrders);
		});
	});

	describe('findOne', () => {
		it('should return a single order by ID', async () => {
			const orderId = 'order-123';
			const mockOrder = {
				id: orderId,
				productId: 'product-123',
				buyerAddress: 'buyer-address-123',
				sellerAddress: 'seller-address-123',
				escrowId: 'escrow-123',
				status: OrderStatus.PENDING,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			mockPrismaService.order.findUnique.mockResolvedValue(mockOrder);

			const result = await service.findOne(orderId);

			expect(mockPrismaService.order.findUnique).toHaveBeenCalledWith({
				where: { id: orderId },
			});
			expect(result).toEqual(mockOrder);
		});
	});

	describe('updateStatus', () => {
		it('should update an order status', async () => {
			const orderId = 'order-123';
			const newStatus = OrderStatus.APPROVED;
			const mockOrder = {
				id: orderId,
				productId: 'product-123',
				buyerAddress: 'buyer-address-123',
				sellerAddress: 'seller-address-123',
				escrowId: 'escrow-123',
				status: newStatus,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			mockPrismaService.order.update.mockResolvedValue(mockOrder);

			const result = await service.updateStatus(orderId, newStatus);

			expect(mockPrismaService.order.update).toHaveBeenCalledWith({
				where: { id: orderId },
				data: { status: newStatus },
			});
			expect(result).toEqual(mockOrder);
		});
	});
});
