"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useTransition } from "react";

import { useToast } from "@/hooks/use-toast";
import { Language } from "@/lib/i18n/config";
import { setLanguage } from "@/lib/i18n/language";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";

export const LanguageSelector = () => {
	const [isPending, startTransition] = useTransition();
	const locale = useLocale();
	const { toast } = useToast();
	const t = useTranslations();

	const previousLocale = useRef(locale);

	useEffect(() => {
		if (locale !== previousLocale.current) {
			toast({
				description: t("sidebar.language.successMessage"),
			});
			previousLocale.current = locale;
		}
	}, [locale, toast, t]);

	const handleChange = (newLang: Language) => {
		startTransition(() => {
			setLanguage(newLang).catch((error) => {
				console.log(error);
				toast({
					variant: "destructive",
					description: t("sidebar.language.errorMessage"),
				});
			});
		});
	};

	return (
		<Select value={locale} onValueChange={handleChange} disabled={isPending}>
			<SelectTrigger className="w-[85px] h-9 pr-0 flex items-center gap-1 text-sm border-none shadow-none focus:ring-0">
				<SelectValue placeholder="Language" />
			</SelectTrigger>
			<SelectContent className="min-w-[70px]">
				<SelectItem value="en" className="text-sm">
					<div className="flex items-center gap-2 mr-4">
						<Image
							src="/images/en-flag.svg"
							alt="English"
							width={24}
							height={24}
							className="object-contain"
						/>
						<span>EN</span>
					</div>
				</SelectItem>
				<SelectItem value="es" className="text-sm">
					<div className="flex items-center gap-2">
						<Image
							src="/images/es-flag.svg"
							alt="Español"
							width={24}
							height={24}
							className="object-contain"
						/>
						<span>ES</span>
					</div>
				</SelectItem>
			</SelectContent>
		</Select>
	);
};
