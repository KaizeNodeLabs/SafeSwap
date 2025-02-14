import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { ProductDTO } from "./dto/create-product.input";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";

@Resolver(() => Product)
export class ProductResolver {
	constructor(private readonly productService: ProductService) {}

	@Mutation(() => Product)
	async createProduct(
		@Args("createProduct") payload: ProductDTO,
	): Promise<Product> {
		return await this.productService.createProduct(payload);
	}
}
