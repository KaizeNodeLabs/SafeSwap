import { Test, TestingModule } from '@nestjs/testing';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { OrderStatus } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';

describe('OrderResolver', () => {
  let resolver: OrderResolver;
  let orderService: OrderService;

  const mockOrderService = {
    create: jest.fn(),
    findAllByBuyer: jest.fn(),
    findAllBySeller: jest.fn(),
    findOne: jest.fn(),
    updateStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderResolver,
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    resolver = module.get<OrderResolver>(OrderResolver);
    orderService = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getOrdersByBuyer', () => {
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

      mockOrderService.findAllByBuyer.mockResolvedValue(mockOrders);

      const result = await resolver.getOrdersByBuyer(buyerAddress);

      expect(mockOrderService.findAllByBuyer).toHaveBeenCalledWith(buyerAddress);
      expect(result).toEqual(mockOrders);
    });
  });

  describe('getOrdersBySeller', () => {
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

      mockOrderService.findAllBySeller.mockResolvedValue(mockOrders);

      const result = await resolver.getOrdersBySeller(sellerAddress);

      expect(mockOrderService.findAllBySeller).toHaveBeenCalledWith(sellerAddress);
      expect(result).toEqual(mockOrders);
    });
  });

  describe('getOrder', () => {
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

      mockOrderService.findOne.mockResolvedValue(mockOrder);

      const result = await resolver.getOrder(orderId);

      expect(mockOrderService.findOne).toHaveBeenCalledWith(orderId);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const orderData: CreateOrderInput = {
        productId: 'product-123',
        buyerAddress: 'buyer-address-123',
        sellerAddress: 'seller-address-123',
        escrowId: 'escrow-123',
        status: OrderStatus.PENDING,
      };

      const mockOrder = {
        id: 'order-123',
        productId: orderData.productId,
        buyerAddress: orderData.buyerAddress,
        sellerAddress: orderData.sellerAddress,
        escrowId: orderData.escrowId,
        status: orderData.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockOrderService.create.mockResolvedValue(mockOrder);

      const result = await resolver.createOrder(orderData);

      expect(mockOrderService.create).toHaveBeenCalledWith(orderData);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('updateOrderStatus', () => {
    it('should update an order status', async () => {
      const orderId = 'order-123';
      const newStatus = OrderStatus.APPROVED;
      
      const updateData: UpdateOrderStatusInput = {
        orderId: orderId,
        status: newStatus,
      };

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

      mockOrderService.updateStatus.mockResolvedValue(mockOrder);

      const result = await resolver.updateOrderStatus(updateData);

      expect(mockOrderService.updateStatus).toHaveBeenCalledWith(orderId, newStatus);
      expect(result).toEqual(mockOrder);
    });
  });
});