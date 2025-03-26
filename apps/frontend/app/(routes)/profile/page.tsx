"use client";

import CountrySelect from "@/components/shared/country-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { profile } from "@/lib/mocks/profile";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

export default function ProfilePage() {
	const t = useTranslations();
	const { toast } = useToast();
	const [profileData, setProfileData] = useState(profile);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		toast({
			description: t("profile.successMessage"),
		});

		console.log(profileData);
	};

	return (
		<>
			<div className="flex flex-col">
				<h1 className="text-4xl font-bold mt-8 sm:mt-0">
					{t("common.profile")}
				</h1>
				<p className="text-muted-foreground">{t("profile.subtitle")}</p>
			</div>

			<section className="mt-8">
				<form onSubmit={onSubmit} className="space-y-8">
					<div className="flex gap-5">
						<div className="space-y-2 w-full">
							<Label htmlFor="name">{t("profile.label.name")}</Label>
							<Input
								id="name"
								name="name"
								type="text"
								placeholder={t("profile.placeholder.name")}
								value={profileData.name}
								onChange={(e) =>
									setProfileData({ ...profileData, name: e.target.value })
								}
							/>
						</div>
						<div className="space-y-2 w-full">
							<Label htmlFor="surname">{t("profile.label.surname")}</Label>
							<Input
								id="surname"
								name="surname"
								type="text"
								placeholder={t("profile.placeholder.surname")}
								value={profileData.surname}
								onChange={(e) =>
									setProfileData({ ...profileData, surname: e.target.value })
								}
							/>
						</div>
					</div>

					<div className="space-y-2 w-full">
						<Label htmlFor="email">{t("profile.label.email")}</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder={t("profile.placeholder.email")}
							value={profileData.email}
							onChange={(e) =>
								setProfileData({ ...profileData, email: e.target.value })
							}
						/>
					</div>

					<div className="space-y-2 w-full">
						<Label htmlFor="stellarWallet">
							{t("profile.label.stellarWallet")}
						</Label>
						<Input
							id="stellarWallet"
							name="stellarWallet"
							type="text"
							placeholder={t("profile.placeholder.stellarWallet")}
							value={profileData.stellarWallet}
							disabled
						/>
						<span className="text-muted-foreground text-xs md:text-sm">
							{t("profile.stellarWalletSpan")}
						</span>
					</div>

					<div className="space-y-2 w-full">
						<Label htmlFor="telegramUsername">
							{t("profile.label.telegram")}
						</Label>
						<Input
							id="telegramUsername"
							name="telegramUsername"
							type="text"
							placeholder={t("profile.placeholder.telegram")}
							value={profileData.telegramUsername}
							onChange={(e) =>
								setProfileData({
									...profileData,
									telegramUsername: e.target.value,
								})
							}
						/>
						<span className="text-muted-foreground text-xs md:text-sm">
							{t("profile.telegramSpan")}
						</span>
					</div>

					<div className="space-y-2 w-full">
						<Label htmlFor="country">{t("profile.label.country")}</Label>
						<CountrySelect
							selected={{ name: profileData.country }}
							setSelected={(value) =>
								setProfileData({ ...profileData, country: value.name })
							}
						/>
					</div>

					<Button type="submit">{t("profile.save")}</Button>
				</form>
			</section>
		</>
	);
}
