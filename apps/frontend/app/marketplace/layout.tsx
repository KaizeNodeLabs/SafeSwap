import BreadcrumbNavigation from "@/components/shared/breadcrumb-navigation";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header/header";

export default function MarketplaceLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="container mx-5 md:mx-4 py-4">
				<BreadcrumbNavigation />
			</div>
			<main className="container pb-10">{children}</main>
			<Footer />
		</div>
	);
}
