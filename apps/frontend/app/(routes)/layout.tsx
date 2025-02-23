import Header from "@/components/shared/header/header";
import { SafeSwapSidebar } from "@/components/shared/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<SafeSwapSidebar />
			<main className="flex flex-1 min-h-screen flex-col">
				<Header />
				<div className="container mx-auto px-4 sm:py-6">{children}</div>
			</main>
		</SidebarProvider>
	);
}
