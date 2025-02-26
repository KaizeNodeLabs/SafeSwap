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
							findUnique: jest.fn(),
							create: jest.fn(),
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
});
