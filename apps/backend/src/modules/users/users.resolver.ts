import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Query } from "@nestjs/graphql";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entity/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => [User])
	async users() {
		return this.usersService.findAll();
	}

	@Query(() => User, { nullable: true })
	async user(@Args("walletAddress") walletAddress: string) {
		return this.usersService.findOne(walletAddress);
	}

	@Mutation(() => User)
	async createUser(@Args("data") data: CreateUserInput) {
		return this.usersService.create(data);
	}

	@Mutation(() => User)
	async updateUser(
		@Args("walletAddress") walletAddress: string,
		@Args("data") data: UpdateUserInput,
	) {
		return this.usersService.update(walletAddress, data);
	}
}
