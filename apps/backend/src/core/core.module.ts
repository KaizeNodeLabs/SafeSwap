import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { CategoryModule } from "src/modules/categories/category.module";
import { ProductImageModule } from "src/modules/product-image/product-image.module";
import { ProductModule } from "src/modules/product/product.module";
import { IS_DEV_ENV } from "src/shared/utils/is-dev.util";
import { getGraphQLConfig } from "./config/graphql.config";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
	imports: [
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
	],
	controllers: [],
	providers: [],
})
export class CoreModule {}
