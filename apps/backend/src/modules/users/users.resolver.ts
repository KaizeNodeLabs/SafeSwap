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
	async user(@Args("wallet_address") wallet_address: string) {
		return this.usersService.findOne(wallet_address);
	}

	@Mutation(() => User)
	async createUser(@Args("data") data: CreateUserInput) {
		return this.usersService.create(data);
	}

	@Mutation(() => User)
	async updateUser(
		@Args("wallet_address") wallet_address: string,
		@Args("data") data: UpdateUserInput,
	) {
		return this.usersService.update(wallet_address, data);
	}
}
