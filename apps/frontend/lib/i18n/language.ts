"use server";

import { cookies } from "next/headers";
import { COOKIE_NAME, Language, defaultLanguage } from "./config";

export async function getCurrentLanguage() {
	const cookiesStore = cookies();

	const language = cookiesStore.get(COOKIE_NAME)?.value ?? defaultLanguage;

	return language;
}

export async function setLanguage(language: Language) {
	const cookiesStore = cookies();

	cookiesStore.set(COOKIE_NAME, language);
}
