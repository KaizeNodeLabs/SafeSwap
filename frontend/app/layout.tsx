import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "./components/ui/footer";
import "./globals.css";
import Header from "./components/header/Header";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
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
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Theme>
					<Header />
					<div className="min-h-[calc(100vh-160px)]">{children}</div>
					<Footer />
				</Theme>
			</body>
		</html>
	);
}
