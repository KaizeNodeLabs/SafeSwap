import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductImageDTO } from "./dto/product-image.input";
import { ProductImage } from "./entities/product-image.entity";
import { ProductImageService } from "./product-image.service";

@Resolver("ProductImage")
export class ProductImageResolver {
	constructor(private readonly productImageService: ProductImageService) {}

	@Mutation(() => ProductImage)
	async createProductImage(
		@Args("createProductImage") payload: ProductImageDTO,
	): Promise<ProductImage> {
		return await this.productImageService.createProductImage(payload);
	}

	@Query(() => [ProductImage])
	async productImages() {
		return await this.productImageService.getAllProductImages();
	}

	@Query(() => ProductImage, { nullable: true })
	async productImage(@Args("id") id: string) {
		return await this.productImageService.getAProductImage(id);
	}
}
