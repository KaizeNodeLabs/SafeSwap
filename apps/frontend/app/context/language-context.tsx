"use client";

import { ReactNode, createContext, useContext, useState } from "react";

type LanguageContextType = {
	locale: string;
	setLocale: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [locale, setLocale] = useState("en");

	return (
		<LanguageContext.Provider value={{ locale, setLocale }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}
