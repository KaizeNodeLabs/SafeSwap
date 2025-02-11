import { Args, Query, Resolver } from "@nestjs/graphql";
import { ProductDTO } from "./dto/product.dto";
import { ProductService } from "./product.service";

@Resolver(() => ProductDTO)
export class ProductResolver {
	constructor(private readonly productService: ProductService) {}

	@Query(() => [ProductDTO])
	async products() {
		return this.productService.findAll();
	}

	@Query(() => ProductDTO, { nullable: true })
	async product(@Args("id") id: string) {
		return this.productService.findOne(id);
	}
}
