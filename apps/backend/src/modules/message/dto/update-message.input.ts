import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateMessageInput } from "./create-message.input";

@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {
	@Field(() => Int)
	id: number;
}
