import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CategoryService } from "./category.service";
import { CreateCategoryInput } from "./dto/create-category.input";

describe("CategoryService", () => {
	let service: CategoryService;
	let prismaService: PrismaService;

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
				CategoryService,
				{
					provide: PrismaService,
					useValue: {
						category: {
							findMany: jest.fn().mockResolvedValue(mockCategories),
							findUnique: jest.fn().mockResolvedValue(mockCategory),
							create: jest.fn().mockResolvedValue(mockCategory),
						},
					},
				},
			],
		}).compile();

		service = module.get<CategoryService>(CategoryService);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("findAll", () => {
		it("should return an array of categories", async () => {
			const result = await service.findAll();
			expect(result).toEqual(mockCategories);
			expect(prismaService.category.findMany).toHaveBeenCalled();
		});

		it("should return empty array when no categories exist", async () => {
			jest.spyOn(prismaService.category, "findMany").mockResolvedValueOnce([]);
			const result = await service.findAll();
			expect(result).toEqual([]);
		});

		it("should handle database errors", async () => {
			jest
				.spyOn(prismaService.category, "findMany")
				.mockRejectedValueOnce(new Error("Database error"));
			await expect(service.findAll()).rejects.toThrow("Database error");
		});
	});

	describe("findOne", () => {
		it("should return a single category by id", async () => {
			const result = await service.findOne("1");
			expect(result).toEqual(mockCategory);
			expect(prismaService.category.findUnique).toHaveBeenCalledWith({
				where: { id: "1" },
			});
		});

		it("should return null for non-existent category", async () => {
			jest
				.spyOn(prismaService.category, "findUnique")
				.mockResolvedValueOnce(null);
			const result = await service.findOne("999");
			expect(result).toBeNull();
		});

		it("should handle database errors", async () => {
			jest
				.spyOn(prismaService.category, "findUnique")
				.mockRejectedValueOnce(new Error("Database error"));
			await expect(service.findOne("1")).rejects.toThrow("Database error");
		});
	});

	describe("create", () => {
		const createCategoryInput: CreateCategoryInput = {
			name: "New Category",
		};

		it("should create a new category", async () => {
			const result = await service.create(createCategoryInput);
			expect(result).toEqual(mockCategory);
			expect(prismaService.category.create).toHaveBeenCalledWith({
				data: createCategoryInput,
			});
		});

		it("should create a category without imageUrl", async () => {
			const inputWithoutImage = { name: "New Category" };
			await service.create(inputWithoutImage);
			expect(prismaService.category.create).toHaveBeenCalledWith({
				data: inputWithoutImage,
			});
		});

		it("should handle database errors during creation", async () => {
			jest
				.spyOn(prismaService.category, "create")
				.mockRejectedValueOnce(new Error("Database error"));
			await expect(service.create(createCategoryInput)).rejects.toThrow(
				"Database error",
			);
		});
	});
});
