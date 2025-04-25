import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
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

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageInput: UpdateMessageInput) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}

