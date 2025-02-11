import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ProductImageService } from "./product-image.service";
import { ProductImageDTO } from "./dto/productimage.input";
import { ProductImage } from "./entities/productimage.entity";

@Resolver("ProductImage")
export class ProductImageResolver {
  constructor(private readonly productImageService: ProductImageService) {}

  @Mutation(() => ProductImage) 
  async createProductImage(
    @Args('createProductImage') payload: ProductImageDTO
  ): Promise<ProductImage> {
    return await this.productImageService.createProductImage(payload);
  }

  @Query(() => [ProductImage])
  async ProductImages() {
    return await this.productImageService.getAllProductImages();
  }

}
