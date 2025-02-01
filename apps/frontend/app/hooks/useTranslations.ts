"use client";

import { useLanguage } from "../context/language-context";
import { en } from "../locales/en";
import { es } from "../locales/es";

type TranslationsType = {
	en: typeof en;
	es: typeof es;
};

const translations: TranslationsType = {
	en,
	es,
};

export const useTranslations = () => {
	const { locale } = useLanguage();

	const t = (key: string): string => {
		const keys = key.split(".");
		let value: unknown = translations[locale as keyof TranslationsType];

		for (const k of keys) {
			if (typeof value === "object" && value !== null && k in value) {
				value = (value as Record<string, unknown>)[k];
			} else {
				break;
			}
		}

		return typeof value === "string" ? value : "";
	};

	return { t };
};
