import { Test, TestingModule } from "@nestjs/testing";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

describe("UsersResolver", () => {
	let resolver: UsersResolver;
	let service: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersResolver,
				{
					provide: UsersService,
					useValue: {
						findAll: jest.fn(),
						findOne: jest.fn(),
						create: jest.fn(),
						update: jest.fn(),
					},
				},
			],
		}).compile();

		resolver = module.get<UsersResolver>(UsersResolver);
		service = module.get<UsersService>(UsersService);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});

	it("should return all users", async () => {
		const result = [
			{
				walletAddress: "0x123",
				name: "John Doe",
				surname: "Doe",
				email: "john@example.com",
				telegramUsername: "johnny",
				country: "USA",
				isSeller: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];
		jest.spyOn(service, "findAll").mockResolvedValue(result);
		expect(await resolver.users()).toBe(result);
	});

	it("should return a user by wallet address", async () => {
		const walletAddress = "0x123";
		const result = {
			walletAddress: "0x123",
			name: "John Doe",
			surname: "Doe",
			email: "john@example.com",
			telegramUsername: "johnny",
			country: "USA",
			isSeller: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		jest.spyOn(service, "findOne").mockResolvedValue(result);
		expect(await resolver.user(walletAddress)).toBe(result);
	});

	it("should create a user", async () => {
		const data = {
			walletAddress: "0x123",
			name: "John Doe",
			surname: "Doe",
			email: "john@example.com",
			telegramUsername: "johnny",
			country: "USA",
			isSeller: false,
		};
		const result = { id: 1, ...data, createdAt: new Date(), updatedAt: new Date() };
		jest.spyOn(service, "create").mockResolvedValue(result);
		expect(await resolver.createUser(data)).toBe(result);
	});

	it("should update a user", async () => {
		const walletAddress = "0x123";
		const data = { name: "Jane Doe" };
		const result = {
			walletAddress,
			name: "Jane Doe",
			surname: "Doe",
			email: "john@example.com",
			telegramUsername: "johnny",
			country: "USA",
			isSeller: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		jest.spyOn(service, "update").mockResolvedValue(result);
		expect(await resolver.updateUser(walletAddress, data)).toBe(result);
	});
});
