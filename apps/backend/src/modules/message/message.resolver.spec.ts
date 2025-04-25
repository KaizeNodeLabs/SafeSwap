import { Test, TestingModule } from '@nestjs/testing';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { CreateMessageInput } from './dto/create-message.input';

describe('MessageResolver', () => {
  let resolver: MessageResolver;
  let messageService: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageResolver,
        {
          provide: MessageService,
          useValue: {
            getMessagesByOrder: jest.fn(),
            sendMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageResolver>(MessageResolver);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getMessagesByOrder', () => {
    it('should return messages for a given order', async () => {
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

      (messageService.getMessagesByOrder as jest.Mock).mockResolvedValue(mockMessages);

      const result = await resolver.getMessagesByOrder(orderId);

      expect(result).toEqual(mockMessages);
      expect(messageService.getMessagesByOrder).toHaveBeenCalledWith(orderId);
    });
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

      (messageService.sendMessage as jest.Mock).mockResolvedValue(mockCreatedMessage);

      const result = await resolver.sendMessage(createMessageInput);

      expect(result).toEqual(mockCreatedMessage);
      expect(messageService.sendMessage).toHaveBeenCalledWith(createMessageInput);
    });
  });
});
