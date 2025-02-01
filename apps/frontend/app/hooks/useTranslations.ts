"use client";

import { useLanguage } from "../context/language-context";
import { en } from "../locales/en";
import { es } from "../locales/es";

const translations = {
	en,
	es,
};

export const useTranslations = () => {
	const { locale } = useLanguage();

	const t = (key: string) => {
		const keys = key.split(".");
		let value = translations[locale as keyof typeof translations];

		for (const k of keys) {
			if (value && typeof value === "object") {
				value = value[k as keyof typeof value];
			}
		}

		return value as string;
	};

	return { t };
};
