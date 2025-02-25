import ProductCarousel from "@/components/home/product-carousel";

export default function ShoppingPage() {
	return (
		<div className="container mx-auto p-4 sm:p-6 lg:p-8">
			<h1 className="text-3xl font-bold mb-4 text-center sm:text-left">
				ShoppingPage
			</h1>
			<ProductCarousel />
		</div>
	);
}

//Old content of Shopping Page
// export default function ShoppingPage() {
// 	return <div>ShoppingPage</div>;
// }
