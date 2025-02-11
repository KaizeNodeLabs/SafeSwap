import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductDTO } from './dto/create-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product) 
  async createProduct(
    @Args('createProduct') payload: ProductDTO
  ): Promise<Product> {
    return await this.productService.createProduct(payload);
  }

}
