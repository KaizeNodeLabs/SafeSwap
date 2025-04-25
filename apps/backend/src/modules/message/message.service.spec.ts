import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateMessageInput } from './dto/create-message.input';

describe('MessageService', () => {
  let service: MessageService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: PrismaService,
          useValue: {
            message: {
              create: jest.fn(), 
              findMany: jest.fn(), 
            },
          },
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('sendMessage', () => {
    it('should send a new message and return it', async () => {
      const createMessageInput: CreateMessageInput = {
        orderId: 'order-id',
        senderAddress: 'user-address',
        content: 'Test content',
      };

      const mockCreatedMessage = {
        id: 'message-id',
        orderId: createMessageInput.orderId, 
        senderAddress: createMessageInput.senderAddress, 
        content: createMessageInput.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mocking prismaService.message.create
      (prismaService.message.create as jest.Mock).mockResolvedValue(mockCreatedMessage);

      const result = await service.sendMessage(createMessageInput);

      // Assertions
      expect(result).toEqual(mockCreatedMessage);
      expect(prismaService.message.create).toHaveBeenCalledWith({
        data: {
          orderId: createMessageInput.orderId, 
          senderAddress: createMessageInput.senderAddress, 
          content: createMessageInput.content,
        },
      });
    });
  });

  describe('getMessagesByOrder', () => {
    it('should return all messages for a given order', async () => {
      const orderId = 'order-id';
      const mockMessages = [
        {
          id: 'message-id-1',
          orderId: orderId,
          senderAddress: 'user-address',
          content: 'Test content 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'message-id-2',
          orderId: orderId,
          senderAddress: 'user-address',
          content: 'Test content 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Mocking prismaService.message.findMany
      (prismaService.message.findMany as jest.Mock).mockResolvedValue(mockMessages);

      const result = await service.getMessagesByOrder(orderId);
      expect(result).toEqual(mockMessages);
      expect(prismaService.message.findMany).toHaveBeenCalledWith({
        where: { orderId: orderId }, 
        orderBy: { createdAt: 'asc' },
      });
    });
  });
});
