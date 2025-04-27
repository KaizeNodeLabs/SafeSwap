import { Module } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { MessageResolver } from "./message.resolver";
import { MessageService } from "./message.service";

@Module({
	providers: [MessageResolver, MessageService, PrismaService],
})
export class MessageModule {}
