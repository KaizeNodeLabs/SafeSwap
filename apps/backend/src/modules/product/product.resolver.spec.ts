import { Test, TestingModule } from "@nestjs/testing";
import { CreateProductInput } from "./dto/create-product.input";
import { ProductDTO } from "./dto/product.dto";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";

describe("ProductResolver", () => {
	let resolver: ProductResolver;
	let productService: ProductService;

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
				ProductResolver,
				{
					provide: ProductService,
					useValue: {
						findAll: jest.fn().mockResolvedValue([mockProduct]),
						findOne: jest.fn().mockResolvedValue(mockProduct),
						create: jest.fn().mockResolvedValue(mockProduct),
					},
				},
			],
		}).compile();

		resolver = module.get<ProductResolver>(ProductResolver);
		productService = module.get<ProductService>(ProductService);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});

	describe("products", () => {
		it("should return an array of products", async () => {
			await expect(resolver.products()).resolves.toEqual([mockProduct]);
			expect(productService.findAll).toHaveBeenCalledTimes(1);
		});
	});

	describe("product", () => {
		it("should return a single product by ID", async () => {
			await expect(resolver.product("1")).resolves.toEqual(mockProduct);
			expect(productService.findOne).toHaveBeenCalledWith("1");
			expect(productService.findOne).toHaveBeenCalledTimes(1);
		});
	});

	describe("createProduct", () => {
		it("should create a new product", async () => {
			await expect(
				resolver.createProduct(mockCreateProductInput),
			).resolves.toEqual(mockProduct);
			expect(productService.create).toHaveBeenCalledWith(
				mockCreateProductInput,
			);
			expect(productService.create).toHaveBeenCalledTimes(1);
		});
	});
});
