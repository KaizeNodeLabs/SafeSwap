import { z } from "zod";

export const sellerOnboardingSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name cannot exceed 50 characters")
		.trim(),
	surname: z
		.string()
		.min(2, "Surname must be at least 2 characters")
		.max(50, "Surname cannot exceed 50 characters")
		.trim(),

	email: z.string().email("Email must be in a valid format."),
	wallet: z
		.string()
		.min(1, "Wallet must be connected")
		.refine((wallet) => wallet !== "Not Connected", {
			message: "Please connect your wallet",
		}),
	telegram: z
		.string()
		.optional()
		.refine((val) => !val || val.startsWith("@"), {
			message: "Telegram username should start with '@'.",
		}),
	country: z
		.string()
		.min(1, { message: "Country must be selected before submission." }),
	terms: z.boolean().refine((val) => val === true, {
		message: "Checkbox must be checked before submitting.",
	}),
});

export type TSellerOnboarding = z.infer<typeof sellerOnboardingSchema>;
