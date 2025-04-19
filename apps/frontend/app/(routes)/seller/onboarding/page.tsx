"use client";
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
import { useWallet } from "@/hooks/useWallet";
import {
	TSellerOnboarding,
	sellerOnboardingSchema,
} from "@/lib/schemas/sellerOnboarding";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Mail, MessageSquare, User, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function OnboardingPage() {
	const t = useTranslations();

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<TSellerOnboarding>({
		resolver: zodResolver(sellerOnboardingSchema),
		defaultValues: {
			name: "",
			surname: "",
			email: "",
			wallet: "",
			telegram: "",
			country: "",
			terms: false,
		},
	});

	const { isConnected, walletAddress } = useWallet();
	const [trimmedWalletAddress, setTrimmedWalletAddress] = useState("");

	const getTranslatedErrorMessage = (errorKey: string) => {
		return t(`sellerOnboarding.errors.${errorKey}`);
	};

	const shortenWalletAddress = useCallback((wallet: string) => {
		return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
	}, []);

	useEffect(() => {
		if (isConnected && walletAddress) {
			setValue("wallet", walletAddress); // Autofill wallet address
			setTrimmedWalletAddress(shortenWalletAddress(getValues("wallet")));
		} else {
			const errorMessage = t("sellerOnboarding.form.not_connected");
			setValue("wallet", errorMessage);
		}
	}, [
		isConnected,
		walletAddress,
		setValue,
		t,
		getValues,
		shortenWalletAddress,
	]);

	const onSubmit = (data: TSellerOnboarding) => {
		console.log(data);
	};

	return (
		<section className="w-full h-full flex flex-col items-center justify-center py-10 md:py-6">
			<header className="flex flex-col items-center space-y-2 text-center">
				<h1 className="text-2xl font-semibold">
					{t("sellerOnboarding.title")}
				</h1>
				<p className="text-gray-500 md:w-2/3 ">
					{t("sellerOnboarding.description")}
				</p>
			</header>

			<Card className="mt-6 md:max-w-md shadow-sm px-1.5 py-4 rounded-lg">
				<CardContent className="">
					<form
						action=""
						className="flex flex-col space-y-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						{/* Name */}
						<div className="relative flex flex-col gap-1.5">
							<Label htmlFor="name">{t("sellerOnboarding.form.name")}</Label>
							<Input
								{...register("name")}
								id="name"
								type="text"
								className="pl-10 focus:outline-none"
								placeholder={t("sellerOnboarding.form.namePlaceholder")}
							/>
							<User className="absolute top-7 left-3 text-gray-500" size={20} />
							{errors.name && (
								<p className="text-red-500 text-xs">
									{getTranslatedErrorMessage("name")}
								</p>
							)}
						</div>

						{/* Surname */}
						<div className="relative flex flex-col gap-1.5">
							<Label htmlFor="surname">
								{t("sellerOnboarding.form.surname")}
							</Label>
							<Input
								{...register("surname")}
								id="surname"
								type="text"
								className="pl-10 focus:outline-none"
								placeholder={t("sellerOnboarding.form.surnamePlaceholder")}
							/>
							<User className="absolute top-7 left-3 text-gray-500" size={20} />
							{errors.surname && (
								<p className="text-red-500 text-xs">
									{getTranslatedErrorMessage("surname")}
								</p>
							)}
						</div>
						<div className="relative flex flex-col gap-1.5">
							<Label htmlFor="email">{t("sellerOnboarding.form.email")}</Label>
							<Input
								{...register("email")}
								id="email"
								type="email"
								placeholder={t("sellerOnboarding.form.emailPlaceholder")}
								className="pl-10 focus:outline-none"
							/>
							<Mail className="absolute top-7 left-3 text-gray-500" size={20} />
							{errors.email?.message && (
								<p className="text-red-500 text-xs">
									{getTranslatedErrorMessage("email")}
								</p>
							)}
						</div>

						<div className="relative flex flex-col gap-1.5">
							<Label htmlFor="wallet">
								{isConnected
									? t("sellerOnboarding.form.your_wallet_address") +
										trimmedWalletAddress
									: t("sellerOnboarding.form.wallet")}
							</Label>
							<Input
								{...register("wallet")}
								id="wallet"
								type="text"
								readOnly
								placeholder={t("sellerOnboarding.form.walletPlaceholder")}
								className="pl-10 focus:outline-none cursor-not-allowed"
							/>
							<Wallet
								className="absolute top-7 left-3 text-gray-500"
								size={20}
							/>
							{errors.wallet?.message && (
								<p className="text-red-500 text-xs">
									{getTranslatedErrorMessage("wallet")}
								</p>
							)}
						</div>

						<div className="relative flex flex-col gap-1.5">
							<Label htmlFor="username">
								{t("sellerOnboarding.form.telegram")}
							</Label>
							<Input
								{...register("telegram")}
								id="username"
								type="text"
								placeholder={t("sellerOnboarding.form.telegramPlaceholder")}
								className="pl-10 focus:outline-none"
							/>
							<MessageSquare
								className="absolute top-7 left-3 text-gray-500"
								size={20}
							/>

							{errors.telegram?.message && (
								<p className="text-red-500 text-xs">
									{getTranslatedErrorMessage("telegram")}
								</p>
							)}
						</div>

						<div className="relative flex flex-col gap-1.5">
							<Label htmlFor="country">
								{t("sellerOnboarding.form.country")}
							</Label>

							<Select
								{...register("country")}
								onValueChange={(value) => setValue("country", value)}
							>
								<SelectTrigger className={cn("pl-10")}>
									<SelectValue
										placeholder={t("sellerOnboarding.form.countryPlaceholder")}
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="us">United States</SelectItem>
									<SelectItem value="uk">United Kingdom</SelectItem>
									<SelectItem value="ng">Nigeria</SelectItem>
								</SelectContent>
							</Select>
							<Globe
								className="absolute top-7 left-3 text-gray-500"
								size={20}
							/>
							{errors.country && (
								<p className="text-red-500 text-xs">
									{getTranslatedErrorMessage("country")}
								</p>
							)}
						</div>

						<div className="flex space-x-3">
							<Checkbox
								onCheckedChange={(checked) => setValue("terms", !!checked)}
							/>

							<div className="inline-flex flex-col space-y-1">
								<Label>{t("sellerOnboarding.form.terms")}</Label>
								<p className="text-xs text-gray-500">
									{t("sellerOnboarding.form.termsDescription")}
								</p>
							</div>
						</div>

						{errors.terms && (
							<p className="text-red-500 text-xs">
								{getTranslatedErrorMessage("terms")}
							</p>
						)}

						<Button className="w-full" size="default">
							{t("sellerOnboarding.form.submitButton")}
						</Button>
					</form>
				</CardContent>
			</Card>
		</section>
	);
}
