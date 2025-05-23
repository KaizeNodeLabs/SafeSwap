import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { AuthModule } from "src/auth/auth.module";
import { CategoryModule } from "src/modules/categories/category.module";
import { ProductImageModule } from "src/modules/product-image/product-image.module";
import { ProductModule } from "src/modules/product/product.module";
import { ReviewModule } from "src/modules/review/review.module";
import { UsersModule } from "src/modules/users/users.module";
import { IS_DEV_ENV } from "src/shared/utils/is-dev.util";
import { MessageModule } from "../modules/message/message.module";
import { getGraphQLConfig } from "./config/graphql.config";
import { PrismaModule } from "./prisma/prisma.module";

import { OrderModule } from "src/modules/order/order.module";
@Module({
	imports: [
		AuthModule,
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true,
		}),
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			imports: [ConfigModule],
			useFactory: getGraphQLConfig,
			inject: [ConfigService],
		}),
		PrismaModule,
		CategoryModule,
		ProductModule,
		ProductImageModule,
		UsersModule,
		OrderModule,
		MessageModule,
		ReviewModule,
	],
	controllers: [],
	providers: [],
})
export class CoreModule {}
