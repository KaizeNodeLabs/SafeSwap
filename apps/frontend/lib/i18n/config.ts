export const COOKIE_NAME = "language";
export const languages = ["en", "es"] as const;
export const defaultLanguage = "en";

export type Language = (typeof languages)[number];
