import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import localFont from "next/font/local";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ApolloClientProvider } from "@/context/ApolloClientProvider";
import { ThemeProvider } from "../components/providers/theme-provider";
import { WalletProvider } from "../context/WalletContext";

const satoshi = localFont({
	src: "../fonts/Satoshi.woff2",
	variable: "--font-satoshi",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "SafeSwap",
	description: "A safe marketplace for buyers and sellers",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body className={`${satoshi.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NextIntlClientProvider messages={messages}>
						<ApolloClientProvider>
							<WalletProvider>{children}</WalletProvider>
						</ApolloClientProvider>
						<Toaster />
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
