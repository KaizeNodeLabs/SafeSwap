import { Args, Query, Resolver } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { Category } from "./dto/category.dto";

@Resolver(() => Category)
export class CategoryResolver {
	public constructor(private readonly categoryService: CategoryService) {}

	@Query(() => [Category])
	public async categories() {
		return this.categoryService.findAll();
	}

	@Query(() => Category, { nullable: true })
	public async category(@Args("id") id: string) {
		return this.categoryService.findOne(id);
	}
}
