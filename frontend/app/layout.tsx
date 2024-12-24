import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "./components/ui/footer";
import "./globals.css";
import Header from "./components/header/Header";
import { ThemeProvider } from "./components/providers/theme-provider";
import SidebarComponent from "./components/sidebar/Sidebar";
import { Sidebar, SidebarProvider } from "./components/ui/sidebar";

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
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Theme>
						<SidebarProvider>
							<div className="flex min-h-screen">
								<Sidebar>
									<SidebarComponent />
								</Sidebar>
								<div className="flex-1 overflow-auto">
									<Header />
									{children}
								</div>
							</div>
						</SidebarProvider>
						<Footer />
					</Theme>
				</ThemeProvider>
			</body>
		</html>
	);
}
