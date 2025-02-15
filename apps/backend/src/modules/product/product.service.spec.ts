import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../core/prisma/prisma.service";
import { CreateProductInput } from "./dto/create-product.input";
import { ProductDTO } from "./dto/product.dto";
import { ProductService } from "./product.service";

describe("ProductService", () => {
	let service: ProductService;
	let prisma: PrismaService;

	const mockProduct: ProductDTO = {
		id: "1",
		name: "Test Product",
		slug: "test-product",
		description: "This is a test product",
		price: 99.99,
		categoryId: "category-1",
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const mockCreateProductInput: CreateProductInput = {
		name: "Test Product",
		slug: "test-product",
		description: "This is a test product",
		price: 99.99,
		categoryId: "category-1",
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductService,
				{
					provide: PrismaService,
					useValue: {
						product: {
							findMany: jest.fn().mockResolvedValue([mockProduct]),
							findUnique: jest.fn().mockResolvedValue(mockProduct),
							create: jest.fn().mockResolvedValue(mockProduct),
						},
					},
				},
			],
		}).compile();

		service = module.get<ProductService>(ProductService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("findAll", () => {
		it("should return an array of products", async () => {
			await expect(service.findAll()).resolves.toEqual([mockProduct]);
			expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
		});
	});

	describe("findOne", () => {
		it("should return a single product by ID", async () => {
			await expect(service.findOne("1")).resolves.toEqual(mockProduct);
			expect(prisma.product.findUnique).toHaveBeenCalledWith({
				where: { id: "1" },
			});
			expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
		});
	});

	describe("create", () => {
		it("should create and return a new product", async () => {
			await expect(service.create(mockCreateProductInput)).resolves.toEqual(
				mockProduct,
			);
			expect(prisma.product.create).toHaveBeenCalledWith({
				data: mockCreateProductInput,
			});
			expect(prisma.product.create).toHaveBeenCalledTimes(1);
		});
	});
});
