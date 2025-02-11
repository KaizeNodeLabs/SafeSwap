import { Module } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { ProductImageResolver } from './product-image.resolver';

@Module({
  providers: [ProductImageResolver, ProductImageService],
})
export class ProductImageModule {}
