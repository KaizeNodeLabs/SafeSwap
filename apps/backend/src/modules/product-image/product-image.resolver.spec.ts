import { Test, TestingModule } from "@nestjs/testing";
import { ProductImageResolver } from "./product-image.resolver";
import { ProductImageService } from "./product-image.service";

describe("ProductImageResolver", () => {
	let resolver: ProductImageResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProductImageResolver, ProductImageService],
		}).compile();

		resolver = module.get<ProductImageResolver>(ProductImageResolver);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});
});
