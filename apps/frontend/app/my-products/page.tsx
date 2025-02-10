"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { products as initialProducts } from "@/lib/mocks/products";
import {
	ArrowDown,
	ArrowDownUp,
	ArrowUp,
	Eye,
	Plus,
	SquarePen,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const columnMappings: Record<string, keyof (typeof initialProducts)[0]> = {
	Product: "name",
	Category: "category",
	Price: "price",
};

export default function MyProductsPage() {
	const [sortColumn, setSortColumn] = useState<
		keyof (typeof initialProducts)[0] | null
	>(null);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [searchQuery, setSearchQuery] = useState("");

	const sortedProducts = [...initialProducts]
		.filter(
			(product) =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.category.toLowerCase().includes(searchQuery.toLowerCase()),
		)
		.sort((a, b) => {
			if (!sortColumn) return 0;
			const valueA = a[sortColumn];
			const valueB = b[sortColumn];

			if (typeof valueA === "string" && typeof valueB === "string") {
				return sortOrder === "asc"
					? valueA.localeCompare(valueB)
					: valueB.localeCompare(valueA);
			}

			if (typeof valueA === "number" && typeof valueB === "number") {
				return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
			}

			return 0;
		});

	const handleSort = (columnKey: string) => {
		const column = columnMappings[columnKey];
		if (sortColumn === column) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortOrder("asc");
		}
	};

	return (
		<section className="py-4 space-y-10">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="capitalize text-3xl font-bold">
						my products ({sortedProducts.length})
					</h1>
					<p className="text-muted-foreground">
						These are the products you want to sell.
					</p>
				</div>
				<Button>
					<Plus /> Sell a Product
				</Button>
			</div>

			<div className="space-y-4">
				<Input
					placeholder="Search products..."
					className="w-96"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<Table className="border">
					<TableHeader>
						<TableRow>
							{Object.keys(columnMappings).map((col) => (
								<TableHead key={col} className="cursor-pointer">
									<button
										type="button"
										onClick={() => handleSort(col)}
										className="flex items-center gap-3"
									>
										{col}
										{sortColumn === columnMappings[col] ? (
											sortOrder === "asc" ? (
												<ArrowUp size={16} />
											) : (
												<ArrowDown size={16} />
											)
										) : (
											<ArrowDownUp size={16} />
										)}
									</button>
								</TableHead>
							))}
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedProducts.length > 0 ? (
							sortedProducts.map((product) => (
								<TableRow key={product.id}>
									<TableCell className="flex items-center gap-4">
										<Image
											src={product.images[0].src}
											alt={product.images[0].alt}
											width={50}
											height={50}
											className="rounded-lg"
										/>
										<span>{product.name}</span>
									</TableCell>
									<TableCell>{product.category}</TableCell>
									<TableCell>${product.price}</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<Button variant={"outline"} size={"icon"}>
												<Eye />
											</Button>
											<Button variant={"outline"} size={"icon"}>
												<SquarePen />
											</Button>
											<Button variant={"outline"} size={"icon"}>
												<Trash2 />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={4} className="text-center py-4">
									No products found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</section>
	);
}
