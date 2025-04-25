import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(data: CreateMessageInput) {
    return this.prisma.message.create({
      data: {
        order_id: data.orderId,
        sender_address: data.senderAddress,
        content: data.content,
      },
    });
  }

  async getMessagesByOrder(orderId: string) {
    return this.prisma.message.findMany({
      where: { order_id: orderId },
      orderBy: { created_at: 'asc' },
    });
  }

}

