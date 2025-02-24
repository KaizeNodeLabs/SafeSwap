import { z } from "zod";

export const sellerOnboardingSchema = z.object({
	email: z.string().email("Email must be in a valid format."),
	wallet: z
		.string()
		.regex(
			/^G[A-Z0-9]{55}$/,
			"Stellar wallet address must start with 'G' and be 56 characters long.",
		),
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
