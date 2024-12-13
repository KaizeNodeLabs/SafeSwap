"use client";

import ProductDetailModal from "@/app/components/products/ProductDetailModal";
import { Button } from "@/app/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarProvider,
	SidebarTrigger,
} from "@/app/components/ui/sidebar";
import { Slider } from "@/app/components/ui/slider";
import {
	Eye,
	Menu as HamIcon,
	Home,
	MessageSquareMore,
	Search,
	ShoppingCart,
	Wallet,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction, useState } from "react";
import ImageCarousel from "../components/ui/image-carrousel";
import ProductUploadModal from "../components/ui/product-upload-modal";

interface Product {
	id: number;
	images: { src: string; alt: string }[];
	name: string;
	price: number;
	description: string;
	category: string;
}

interface SidebarComponentProps {
	priceRange: [number, number];
	setPriceRange: Dispatch<SetStateAction<[number, number]>>;
	selectedCategories: string[];
	handleCategoryChange: (category: string) => void;
}

interface HeaderComponentProps {
	searchTerm: string;
	setSearchTerm: Dispatch<SetStateAction<string>>;
}

interface ProductListProps {
	products: Product[];
}

const products: Product[] = [
	{
		id: 1,
		name: "MacBook Pro 14",
		price: 1299,
		category: "Electronics",
		description: "The new MacBook Pro 14-inch with the M1 Pro chip.",
		images: [
			{ src: "/images/macbook-pro-14.webp", alt: "MacBook Pro 14" },
			{ src: "/images/macbook-pro-14.webp", alt: "MacBook Pro 14" },
			{ src: "/images/macbook-pro-14.webp", alt: "MacBook Pro 14" },
		],
	},
	{
		id: 2,
		name: "Samsung Galaxy S24 FE",
		price: 699,
		category: "Electronics",
		description: "The new Samsung Galaxy S24 FE with 5G support.",
		images: [
			{
				src: "/images/samsung-galaxy-s24-fe.webp",
				alt: "Samsung Galaxy S24 FE",
			},
			{
				src: "/images/samsung-galaxy-s24-fe.webp",
				alt: "Samsung Galaxy S24 FE",
			},
			{
				src: "/images/samsung-galaxy-s24-fe.webp",
				alt: "Samsung Galaxy S24 FE",
			},
		],
	},
	{
		id: 3,
		name: "Ergonomic Chair",
		price: 299,
		category: "Furniture",
		description: "Ergonomic chair for your home office.",
		images: [
			{ src: "/images/ergonomic-chair.jpg", alt: "Ergonomic Chair" },
			{ src: "/images/ergonomic-chair.jpg", alt: "Ergonomic Chair" },
			{ src: "/images/ergonomic-chair.jpg", alt: "Ergonomic Chair" },
		],
	},
	{
		id: 4,
		name: "Coffee Maker",
		price: 89,
		category: "Appliances",
		description: "Coffee maker with built-in grinder.",
		images: [
			{ src: "/images/coffee-maker.webp", alt: "Coffee Maker" },
			{ src: "/images/coffee-maker.webp", alt: "Coffee Maker" },
			{ src: "/images/coffee-maker.webp", alt: "Coffee Maker" },
		],
	},
	{
		id: 5,
		name: "Running Shoes",
		price: 129,
		category: "Sports",
		description: "Running shoes for your daily workout.",
		images: [
			{ src: "/images/running-shoes.jpg", alt: "Running Shoes" },
			{ src: "/images/running-shoes.jpg", alt: "Running Shoes" },
			{ src: "/images/running-shoes.jpg", alt: "Running Shoes" },
		],
	},
	{
		id: 6,
		name: "Wireless Earbuds",
		price: 159,
		category: "Electronics",
		description: "Wireless earbuds with active noise cancellation.",
		images: [
			{ src: "/images/wireless-earbuds.jpg", alt: "Wireless Earbuds" },
			{ src: "/images/wireless-earbuds.jpg", alt: "Wireless Earbuds" },
			{ src: "/images/wireless-earbuds.jpg", alt: "Wireless Earbuds" },
		],
	},
];

export default function Marketplace() {
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Producto seleccionado
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [showModal, setShowModal] = useState(false);

	const handleCategoryChange = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category],
		);
	};

	const filteredProducts = products.filter(
		(product) =>
			(searchTerm === "" ||
				product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
			(selectedCategories.length === 0 ||
				selectedCategories.includes(product.category)) &&
			product.price >= priceRange[0] &&
			product.price <= priceRange[1],
	);

	const openModal = (product: Product) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setIsModalOpen(false);
	};

	return (
		<SidebarProvider>
			<div className="flex h-screen overflow-hidden">
				<SidebarComponent
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					selectedCategories={selectedCategories}
					handleCategoryChange={handleCategoryChange}
				/>
				<div className="flex-1 overflow-auto">
					<HeaderComponent
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>

					<div className="flex justify-end px-6 mt-4">
						<Button onClick={() => setShowModal(true)}>Add Product</Button>
					</div>

					<ProductList products={filteredProducts} onViewDetails={openModal} />
				</div>
			</div>

			<ProductUploadModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
			/>
			<ProductDetailModal
				isOpen={isModalOpen}
				onClose={closeModal}
				product={selectedProduct}
			/>
		</SidebarProvider>
	);
}

function SidebarComponent({
	priceRange,
	setPriceRange,
	selectedCategories,
	handleCategoryChange,
}: SidebarComponentProps) {
	return (
		<Sidebar>
			<SidebarHeader className="p-6 border-b">
				<h2 className="text-xl font-semibold">Filters</h2>
			</SidebarHeader>
			<SidebarContent className="p-6">
				<div className="space-y-8">
					<div>
						<h3 className="mb-2 text-lg font-medium">Price range</h3>
						<Slider
							min={0}
							max={1500}
							step={10}
							value={priceRange}
							onValueChange={(value) =>
								setPriceRange(value as [number, number])
							}
							className="mb-3"
						/>
						<div className="flex justify-between text-lg">
							<span>${priceRange[0]}</span>
							<span>${priceRange[1]}</span>
						</div>
					</div>
					<div>
						<h3 className="mb-2 text-lg font-medium">Categories</h3>
						<div className="space-y-3">
							{["Electronics", "Furniture", "Appliances", "Sports"].map(
								(category) => (
									<div key={category} className="flex items-center">
										<Checkbox
											id={category}
											checked={selectedCategories.includes(category)}
											onCheckedChange={() => handleCategoryChange(category)}
										/>
										<label htmlFor={category} className="ml-3 text-lg">
											{category}
										</label>
									</div>
								),
							)}
						</div>
					</div>
				</div>
			</SidebarContent>
		</Sidebar>
	);
}

function HeaderComponent({ searchTerm, setSearchTerm }: HeaderComponentProps) {
	const pathname = usePathname();
	const router = useRouter();
	const showHomeButton = pathname?.includes("/marketplace");

	return (
		<header className="flex items-center justify-between p-6 border-b">
			<div className="flex items-center gap-4 min-w-max">
				<SidebarTrigger>
					<Button variant="outline" size="icon">
						<HamIcon className="h-6 w-6" />
						<span className="sr-only">Toggle Sidebar</span>
					</Button>
				</SidebarTrigger>
				{showHomeButton && (
					<Button
						variant="outline"
						size="sm"
						className="flex items-center gap-2 px-2"
						onClick={() => router.push("/")}
					>
						<Home className="h-5 w-5" />
						Home
					</Button>
				)}
			</div>

			<div className="relative w-full pl-2 max-w-[18.75rem] md:w-[18.75rem]">
				<Input
					type="search"
					placeholder="Search products..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full h-8 pr-10"
				/>
				<Button
					size="icon"
					variant="ghost"
					className="absolute right-0 top-0 h-full"
				>
					<Search className="h-5 w-5" />
					<span className="sr-only">Search</span>
				</Button>
			</div>

			<div className="flex items-center gap-2">
				<Button className="group">
					<Wallet className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
					Connect Wallet
				</Button>

				<Button className="group"> 
					<ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
				</Button>
			</div>
		</header>
	);
}

function ProductList({
	products,
	onViewDetails,
}: ProductListProps & { onViewDetails: (product: Product) => void }) {
	return (
		<main className="p-8">
			<h1 className="text-3xl font-bold mb-8">Products</h1>
			<div className="flex flex-wrap justify-center gap-8">
				{products?.map((product) => (
					<Card key={product.id} className="hover:shadow-lg">
						<CardHeader>
							<ImageCarousel images={product.images} />
							<CardTitle className="text-xl font-medium">
								{product.name}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-lg text-gray-500">{product.category}</p>
							<span className="text-3xl font-bold">${product.price}</span>
						</CardContent>
						<CardFooter className="flex justify-between gap-2 items-center flex-wrap">
							<div className="flex flex-col m-auto">
								<Button className="mb-4 bg-black">
									<ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									Add to Cart
								</Button>
								<div className="flex flex-row justify-around gap-2">
									<Button
										onClick={() => onViewDetails(product)}
										className="px-4 py-2 flex hover:bg-[#E0E0E0] hover:border-[#B3B3B3] text-[16px] !bg-[#F5F5F5] !text-black border border-[#D1D1D1]"
									>
										<Eye className="mr-2 h-4 w-4" />
										More Details
									</Button>
									<Button className="text-[16px] !bg-[#F5F5F5] !text-black border border-[#D1D1D1] px-4 py-2 hover:bg-[#E0E0E0] hover:border-[#B3B3B3]">
										<MessageSquareMore className="mr-2 h-4 w-4" /> Chat with
										Seller
									</Button>
								</div>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}
