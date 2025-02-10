import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header/header";

export default function MyProductsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow container pb-10 mx-auto">{children}</main>
			<Footer />
		</div>
	);
}
