"use client";
import { error } from "console";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	TSellerOnboarding,
	sellerOnboardingSchema,
} from "@/lib/schemas/SellerOnboarding";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Globe2, Mail, MessageSquare, Text, Wallet } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function OnboardingPage() {
	const [country, setCountry] = useState<string | null>(null);

	function handleSetCountry(value: string): void {
		setCountry(value);
	}

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<TSellerOnboarding>({
		resolver: zodResolver(sellerOnboardingSchema),
		defaultValues: {
			email: "",
			wallet: "",
			telegram: "",
			country: "",
			terms: false,
		},
	});

	const onSubmit = (data: TSellerOnboarding) => {
		console.log(data);
	};
	return (
		<section className="w-full h-full flex flex-col items-center justify-center py-10 md:py-6">
			<header className="flex flex-col items-center space-y-2 text-center">
				<h1 className="text-2xl font-semibold">Start Selling on SafeSwap</h1>
				<p className="text-gray-500 md:w-2/3 ">
					Join our decentralized marketplace and start selling with Stellar
					escrow. Secure, fast and no storefront needed
				</p>
			</header>

			<Card className="mt-6 md:w-[45%] shadow-sm px-1.5 py-4 rounded-lg bg-white">
				<CardContent className="">
					<form
						action=""
						className="flex flex-col space-y-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="relative flex flex-col gap-1.5">
							<Label htmlFor="email">Email</Label>
							<Input
								{...register("email")}
								id="email"
								type="email"
								placeholder="email@gmail.com"
								className="pl-10 focus:outline-none"
							/>
							<Mail className="absolute top-7 left-3 text-gray-500" size={20} />
							{errors.email?.message && (
								<p className="text-red-500 text-xs">
									{String(errors.email.message)}
								</p>
							)}
						</div>

						<div className="relative flex flex-col gap-1.5">
							<Label htmlFor="wallet">Stellar Wallet Address</Label>
							<Input
								{...register("wallet")}
								id="wallet"
								type="text"
								placeholder="GDDG...P5E7"
								className="pl-10 focus:outline-none"
							/>
							<Wallet
								className="absolute top-7 left-3 text-gray-500"
								size={20}
							/>
							{errors.wallet?.message && (
								<p className="text-red-500 text-xs">
									{String(errors.wallet.message)}
								</p>
							)}
						</div>

						<div className="relative flex flex-col gap-1.5">
							<Label htmlFor="username">Telegram Username (Optional)</Label>
							<Input
								{...register("telegram")}
								id="username"
								type="text"
								placeholder="@username"
								className="pl-10 focus:outline-none"
							/>
							<MessageSquare
								className="absolute top-7 left-3 text-gray-500"
								size={20}
							/>

							{errors.telegram?.message && (
								<p className="text-red-500 text-xs">
									{errors.telegram.message}
								</p>
							)}
						</div>

						<div className="flex flex-col gap-1.5">
							<Label htmlFor="country">Country</Label>

							<Select onValueChange={(value) => setValue("country", value)}>
								<SelectTrigger className={cn("pl-10")}>
									<SelectValue placeholder="Select your country" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="us">United States</SelectItem>
									<SelectItem value="uk">United Kingdom</SelectItem>
									<SelectItem value="ng">Nigeria</SelectItem>
								</SelectContent>
							</Select>
							{errors.country && (
								<p className="text-red-500 text-xs">{errors.country.message}</p>
							)}
						</div>

						<div className="flex space-x-3">
							<Checkbox
								onCheckedChange={(checked) => setValue("terms", !!checked)}
							/>

							<div className="inline-flex flex-col space-y-1">
								<Label> I agree to the terms and conditions</Label>
								<p className="text-xs text-gray-500">
									By checking this box, you agreee to the our Terms of Service
									and Privacy Policy.
								</p>
							</div>
						</div>

						{errors.terms && (
							<p className="text-red-500 text-xs">{errors.terms.message}</p>
						)}

						<Button className="w-full" size="default">
							Start Selling
						</Button>
					</form>
				</CardContent>
			</Card>
		</section>
	);
}
