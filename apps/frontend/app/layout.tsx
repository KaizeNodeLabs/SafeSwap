import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import FilterModal from "@/components/marketplace/filter-modal";
import { ThemeProvider } from "../components/providers/theme-provider";
import { LanguageProvider } from "../context/language-context";

const satoshi = localFont({
	src: "../fonts/Satoshi.woff2",
	variable: "--font-satoshi",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "SafeSwap",
	description: "A safe marketplace for buyers and sellers",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${satoshi.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<LanguageProvider>{children}</LanguageProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
