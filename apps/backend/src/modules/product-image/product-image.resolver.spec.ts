import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ProductImageDTO } from "./dto/product-image.input";
import { ProductImage } from "./entities/product-image.entity";
import { ProductImageResolver } from "./product-image.resolver";
import { ProductImageService } from "./product-image.service";

describe("ProductImageResolver", () => {
	let resolver: ProductImageResolver;

	const mockProductImageService = {
		createProductImage: jest.fn(),
		getAllProductImages: jest.fn(),
		getAProductImage: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductImageResolver,
				ProductImageService,
				{
					provide: ProductImageService,
					useValue: mockProductImageService,
				},
			],
		}).compile();

		resolver = module.get<ProductImageResolver>(ProductImageResolver);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});

	it("should create a product image", async () => {
		const data: ProductImageDTO = {
			imageUrl: "http://image.com",
			productId: "1",
		};

		const createdImage = {
			id: "1",
			...data,
		};

		mockProductImageService.createProductImage.mockReturnValue(createdImage);

		const result = await resolver.createProductImage(data);

		expect(mockProductImageService.createProductImage).toHaveBeenCalled();
		expect(mockProductImageService.createProductImage).toHaveBeenCalledWith(
			data,
		);

		expect(result).toEqual(createdImage);
	});

	it("should return an array of all product images", async () => {
		const productImages = [
			{
				id: "1",
				imageUrl: "http://image.com",
				productId: "1",
			},
		];

		mockProductImageService.getAllProductImages.mockReturnValue(productImages);

		const result = await resolver.productImages();

		expect(mockProductImageService.getAllProductImages).toHaveBeenCalled();

		expect(result).toEqual(productImages);
	});

	it("should return a product image", async () => {
		const productImage = {
			id: "1",
			imageUrl: "http://image.com",
			productId: "1",
		};

		mockProductImageService.getAProductImage.mockReturnValue(productImage);

		const result = await resolver.productImage("1");

		expect(mockProductImageService.getAProductImage).toHaveBeenCalled();
		expect(mockProductImageService.getAProductImage).toHaveBeenCalledWith("1");

		expect(result).toEqual(productImage);
	});
});
