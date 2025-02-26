import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CategoryResolver } from "./category.resolver";
import { CategoryService } from "./category.service";
import { CreateCategoryInput } from "./dto/create-category.input";

describe("CategoryResolver", () => {
	let resolver: CategoryResolver;
	let categoryService: CategoryService;

	const mockCategory = {
		id: "1",
		name: "Test Category",
		imageUrl: "https://example.com/image.jpg",
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const mockCategories = [
		mockCategory,
		{
			id: "2",
			name: "Another Category",
			imageUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CategoryResolver,
				{
					provide: CategoryService,
					useValue: {
						findAll: jest.fn().mockResolvedValue(mockCategories),
						findOne: jest.fn().mockResolvedValue(mockCategory),
						create: jest.fn().mockResolvedValue(mockCategory),
					},
				},
				{
					provide: PrismaService,
					useValue: {
						category: {
							findMany: jest.fn(),
							findUnique: jest.fn(),
							create: jest.fn(),
						},
					},
				},
			],
		}).compile();

		resolver = module.get<CategoryResolver>(CategoryResolver);
		categoryService = module.get<CategoryService>(CategoryService);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});

	describe("categories", () => {
		it("should return an array of categories", async () => {
			const result = await resolver.categories();
			expect(result).toEqual(mockCategories);
			expect(categoryService.findAll).toHaveBeenCalled();
		});

		it("should handle empty categories list", async () => {
			jest.spyOn(categoryService, "findAll").mockResolvedValueOnce([]);
			const result = await resolver.categories();
			expect(result).toEqual([]);
		});

		it("should handle service errors", async () => {
			jest
				.spyOn(categoryService, "findAll")
				.mockRejectedValueOnce(new Error("Service error"));
			await expect(resolver.categories()).rejects.toThrow("Service error");
		});
	});

	describe("category", () => {
		it("should return a single category by id", async () => {
			const result = await resolver.category("1");
			expect(result).toEqual(mockCategory);
			expect(categoryService.findOne).toHaveBeenCalledWith("1");
		});

		it("should return null for non-existent category", async () => {
			jest.spyOn(categoryService, "findOne").mockResolvedValueOnce(null);
			const result = await resolver.category("999");
			expect(result).toBeNull();
		});

		it("should handle service errors", async () => {
			jest
				.spyOn(categoryService, "findOne")
				.mockRejectedValueOnce(new Error("Service error"));
			await expect(resolver.category("1")).rejects.toThrow("Service error");
		});
	});

	describe("createCategory", () => {
		const createCategoryInput: CreateCategoryInput = {
			name: "New Category",
		};

		it("should create a new category", async () => {
			const result = await resolver.createCategory(createCategoryInput);
			expect(result).toEqual(mockCategory);
			expect(categoryService.create).toHaveBeenCalledWith(createCategoryInput);
		});

		it("should handle service errors during creation", async () => {
			jest
				.spyOn(categoryService, "create")
				.mockRejectedValueOnce(new Error("Service error"));
			await expect(
				resolver.createCategory(createCategoryInput),
			).rejects.toThrow("Service error");
		});
	});
});
