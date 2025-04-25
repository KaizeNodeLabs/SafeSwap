import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [Message])
  async getMessagesByOrder(@Args('orderId') orderId: string) {
    return this.messageService.getMessagesByOrder(orderId);
  }

  @Mutation(() => Message)
  async sendMessage(@Args('data') data: CreateMessageInput) {
    return this.messageService.sendMessage(data);
  }

}

