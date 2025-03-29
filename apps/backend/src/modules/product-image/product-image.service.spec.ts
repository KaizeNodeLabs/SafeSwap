import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ProductImageDTO } from "./dto/product-image.input";
import { ProductImageService } from "./product-image.service";

describe("ProductImageService", () => {
	let service: ProductImageService;

	const mockPrismaService = {
		productImage: {
			create: jest.fn(),
			findMany: jest.fn(),
			findUnique: jest.fn(),
		},
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductImageService,
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		service = module.get<ProductImageService>(ProductImageService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
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

		mockPrismaService.productImage.create.mockReturnValue(createdImage);

		const result = await service.createProductImage(data);

		expect(mockPrismaService.productImage.create).toHaveBeenCalled();
		expect(mockPrismaService.productImage.create).toHaveBeenCalledWith({
			data,
		});

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

		mockPrismaService.productImage.findMany.mockReturnValue(productImages);

		const result = await service.getAllProductImages();

		expect(result).toEqual(productImages);
		expect(mockPrismaService.productImage.findMany).toHaveBeenCalled();
	});

	it("should return an empty array if no product images are found", async () => {
		mockPrismaService.productImage.findMany.mockReturnValue([]);

		const result = await service.getAllProductImages();

		expect(result).toEqual([]);
		expect(mockPrismaService.productImage.findMany).toHaveBeenCalled();
	});

	it("should get a product image", async () => {
		const id = "1";
		const data = {
			id: "1",
			imageUrl: "http://image.com",
			productId: "1",
		};

		mockPrismaService.productImage.findUnique.mockReturnValue(data);

		const result = await service.getAProductImage(id);

		expect(result).toEqual(data);
		expect(mockPrismaService.productImage.findUnique).toHaveBeenCalled();
		expect(mockPrismaService.productImage.findUnique).toHaveBeenCalledWith({
			where: { id },
		});
	});

	it("should throw an error if product image is not found", async () => {
		const id = "1";

		mockPrismaService.productImage.findUnique.mockReturnValue(null);

		await expect(service.getAProductImage(id)).rejects.toThrow(
			"Product image not found.",
		);
		expect(mockPrismaService.productImage.findUnique).toHaveBeenCalled();
		expect(mockPrismaService.productImage.findUnique).toHaveBeenCalledWith({
			where: { id },
		});
	});
});
