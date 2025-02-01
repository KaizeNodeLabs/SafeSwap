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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: Record<string, any> | string = translations[locale as keyof TranslationsType];

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      }
    }

    return String(value);
  };

  return { t };
};