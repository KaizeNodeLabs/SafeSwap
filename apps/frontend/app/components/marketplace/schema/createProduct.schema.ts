import { z } from "zod";

export const formSchema = z.object({
	title: z
		.string()
		.min(5, { message: "Title must be at least 5 characters long." })
		.max(100, { message: "Title must not exceed 100 characters." }),
	description: z
		.string()
		.min(10, { message: "Description must be at least 10 characters long." })
		.max(500, { message: "Description must not exceed 500 characters." }),
	category: z.string().min(1, { message: "Category is required." }),
	images: z.array(z.object({ url: z.string() })).optional(),
	price: z
		.number()
		.min(0.01, { message: "Price must be at least $0.01." })
		.max(100000, { message: "Price cannot exceed $100,000." }),
});
