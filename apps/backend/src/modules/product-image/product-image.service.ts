import { Injectable } from "@nestjs/common";
import { ProductImageDTO } from "./dto/productimage.input";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class ProductImageService {
    constructor(private readonly prisma: PrismaService) {}

    // Service to create product Image
    async createProductImage(data: ProductImageDTO) {
      return await this.prisma.productImage.create({ data });
    }
  
   async getAllProductImages() {
      const productImages =  await this.prisma.productImage.findMany();
      if(productImages.length === 0){
        return []
      }
      return productImages
    }
    
  }  
