import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

describe("UsersService", () => {
  let service: UsersService;
  let prisma: PrismaService;

  const mockUserData = {
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn().mockResolvedValue([mockUserData]),
              findUnique: jest.fn().mockResolvedValue(mockUserData),
              create: jest.fn().mockResolvedValue(mockUserData),
              update: jest.fn().mockResolvedValue({
                ...mockUserData,
                name: "Jane Doe",
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should find all users", async () => {
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
    expect(await service.findAll()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          walletAddress: "0x123",
          name: "John Doe",
          surname: "Doe",
          email: "john@example.com",
          telegramUsername: "johnny",
          country: "USA",
          isSeller: false,
        }),
      ])
    );
  });

  it("should find one user by wallet address", async () => {
    const walletAddress = "0x123";
    const result = mockUserData;
    jest.spyOn(service, "findOne").mockResolvedValue(result);
    expect(await service.findOne(walletAddress)).toBe(result);
  });

  it("should throw NotFoundException when user does not exist", async () => {
    const walletAddress = "0x999";
    jest.spyOn(prisma.user, "findUnique").mockResolvedValue(null);
    await expect(service.findOne(walletAddress)).rejects.toThrow(
      NotFoundException
    );
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
    const result = {
      id: 1,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, "create").mockResolvedValue(result);
    expect(await service.create(data)).toBe(result);
  });

  it("should update a user", async () => {
    const walletAddress = "0x123";
    const data = { name: "Jane Doe" };
    const result = {
      ...mockUserData,
      name: "Jane Doe",
    };
    jest.spyOn(service, "update").mockResolvedValue(result);
    expect(await service.update(walletAddress, data)).toBe(result);
  });

  it("should throw NotFoundException when updating a non-existent user", async () => {
    const walletAddress = "0x999";
    const data = { name: "Jane Doe" };
    jest.spyOn(prisma.user, "findUnique").mockResolvedValue(null);
    await expect(service.update(walletAddress, data)).rejects.toThrow(
      NotFoundException
    );
  });
});
