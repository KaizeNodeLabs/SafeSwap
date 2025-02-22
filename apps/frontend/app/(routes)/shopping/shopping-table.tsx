"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle, CheckCircle2, Clock, Eye, Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { ShoppingData, TabType } from "./types";

const initialData: ShoppingData[] = [
	{
		date: "2025-02-19",
		product: "MacBook Pro 14",
		id: "1",
		price: 1299,
		seller: "G6L5P4W4LTEJDJJSODOS774",
		status: "For Review",
	},
	{
		date: "2025-02-19",
		product: "Samsung Galaxy S24 FE",
		id: "2",
		price: 699,
		seller: "GMBEGP5I3H4JDJJSODOS774",
		status: "Pending",
	},
	{
		date: "2025-02-19",
		product: "Ergonomic Chair",
		id: "3",
		price: 299,
		seller: "GMQRVJTDFQ7JDJJSODOS774",
		status: "For Review",
	},
	{
		date: "2025-02-19",
		product: "Coffee Maker",
		id: "4",
		price: 89,
		seller: "GN8Z8EUCV7NJDJJSODOS774",
		status: "On Dispute",
	},
	{
		date: "2025-02-19",
		product: "Running Shoes",
		id: "5",
		price: 129,
		seller: "GGA1R9M1H88JDJJSODOS774",
		status: "Approved",
	},
	{
		date: "2025-02-19",
		product: "Wireless Earbuds",
		id: "6",
		price: 159,
		seller: "GEFSYQM2RKSJDJJSODOS774",
		status: "For Review",
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "Pending":
			return "bg-white text-gray-400";
		case "On Dispute":
			return "bg-red-500 text-white";
		case "For Review":
			return "bg-white text-black";
		case "Approved":
			return "bg-black text-white";
		default:
			return "bg-gray-200 text-gray-700";
	}
};

const getStatusIcon = (status: string) => {
	switch (status) {
		case "Pending":
			return <Clock className="w-4 h-4 mr-1" />;
		case "On Dispute":
			return <AlertCircle className="w-4 h-4 mr-1" />;
		case "For Review":
			return <Eye className="w-4 h-4 mr-1" />;
		case "Approved":
			return <CheckCircle2 className="w-4 h-4 mr-1" />;
		default:
			return null;
	}
};

const OrderDetails = ({ order }: { order: ShoppingData }) => {
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<p className="text-sm text-gray-500">Product</p>
					<p className="font-medium">{order.product}</p>
				</div>
				<div>
					<p className="text-sm text-gray-500">Shopping ID</p>
					<p className="font-medium">{order.id}</p>
				</div>
				<div>
					<p className="text-sm text-gray-500">Date</p>
					<p className="font-medium">{order.date}</p>
				</div>
				<div>
					<p className="text-sm text-gray-500">Price</p>
					<p className="font-medium">${order.price}</p>
				</div>
				<div>
					<p className="text-sm text-gray-500">Seller</p>
					<p className="font-mono text-sm">{order.seller}</p>
				</div>
				<div>
					<p className="text-sm text-gray-500">Status</p>
					<Badge
						className={`mt-1 flex items-center w-fit ${getStatusColor(order.status)}`}
					>
						{getStatusIcon(order.status)}
						{order.status}
					</Badge>
				</div>
			</div>

			{order.status !== "Approved" && order.status !== "On Dispute" && (
				<div className="flex gap-2 pt-4 border-t">
					<Button variant="destructive" className="flex-1">
						Start dispute
					</Button>
					<Button
						variant="default"
						className="flex-1 bg-green-600 hover:bg-green-700"
					>
						Approve
					</Button>
				</div>
			)}
		</div>
	);
};

const ShoppingTable = () => {
	const [activeTab, setActiveTab] = useState<TabType>("All");
	const [searchTerm, setSearchTerm] = useState("");
	const [data] = useState<ShoppingData[]>(initialData);
	const [isMobileView, setIsMobileView] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<ShoppingData | null>(null);

	const tabs: TabType[] = [
		"All",
		"Pending",
		"On Dispute",
		"For Review",
		"Approved",
	];

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth < 768);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const formatDate = (date: string | Date): string => {
		const d = new Date(date);
		const year = "20" + d.getFullYear().toString().slice(-2);
		const month = (d.getMonth() + 1).toString().padStart(2, "0");
		const day = d.getDate().toString().padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const formatStellarAddress = (address: string): string => {
		if (!address) return "";
		if (address.length <= 11) return address;
		return `${address.slice(0, 11)}...`;
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Pending":
				return "bg-white text-gray-400";
			case "On Dispute":
				return "bg-red-500 text-white";
			case "For Review":
				return "bg-white text-black";
			case "Approved":
				return "bg-black text-white";
			default:
				return "bg-gray-200 text-gray-700";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "Pending":
				return <Clock className="w-4 h-4 mr-1" />;
			case "On Dispute":
				return <AlertCircle className="w-4 h-4 mr-1" />;
			case "For Review":
				return <Eye className="w-4 h-4 mr-1" />;
			case "Approved":
				return <CheckCircle2 className="w-4 h-4 mr-1" />;
			default:
				return null;
		}
	};

	const handleOrderClick = (order: ShoppingData) => {
		setSelectedOrder(order);
	};

	const renderStellarAddress = (address: string) => (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className="text-left font-mono">
					{formatStellarAddress(address)}
				</TooltipTrigger>
				<TooltipContent>
					<p className="font-mono">{address}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);

	const filteredData = data.filter(
		(item) =>
			(activeTab === "All" || item.status === activeTab) &&
			item.product.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const renderMobileCard = (item: ShoppingData) => (
		<div key={item.id} className="bg-white rounded-lg shadow p-4 mb-4 border">
			<div className="flex justify-between items-start mb-3">
				<div>
					<h3 className="font-medium">{item.product}</h3>
					<p className="text-sm text-gray-500">{formatDate(item.date)}</p>
				</div>
				<Badge
					className={`flex items-center hover:text-white hover:cursor-pointer ${getStatusColor(item.status)}`}
				>
					{getStatusIcon(item.status)}
					{item.status}
				</Badge>
			</div>

			<div className="space-y-2">
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-500">ID:</span>
					<Button
						variant="link"
						className="text-blue-600 hover:underline p-0 h-auto font-normal"
						onClick={() => handleOrderClick(item)}
					>
						{item.id}
					</Button>
				</div>

				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-500">Price:</span>
					<span>${item.price}</span>
				</div>

				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-500">Seller:</span>
					<span>{renderStellarAddress(item.seller)}</span>
				</div>
			</div>

			{item.status !== "Approved" && item.status !== "On Dispute" && (
				<div className="flex gap-2 mt-4">
					<Button variant="destructive" size="sm" className="flex-1">
						Start dispute
					</Button>
					<Button
						variant="default"
						size="sm"
						className="flex-1 bg-green-600 hover:bg-green-700"
					>
						Approve
					</Button>
				</div>
			)}
		</div>
	);

	const renderContent = () => {
		if (isMobileView) {
			return (
				<div className="space-y-4">{filteredData.map(renderMobileCard)}</div>
			);
		}

		return (
			<div className="overflow-x-auto min-h-auto md:min-h-[300px]">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Shopping Date</TableHead>
							<TableHead>Product Name</TableHead>
							<TableHead>Shopping ID</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Seller</TableHead>
							<TableHead>Escrow Status</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredData.map((item) => (
							<TableRow key={item.id}>
								<TableCell>{formatDate(item.date)}</TableCell>
								<TableCell>{item.product}</TableCell>
								<TableCell>
									<Button
										variant="link"
										className="text-blue-600 hover:underline p-0 h-auto font-normal"
										onClick={() => handleOrderClick(item)}
									>
										{item.id}
									</Button>
								</TableCell>
								<TableCell>${item.price}</TableCell>
								<TableCell>{renderStellarAddress(item.seller)}</TableCell>
								<TableCell>
									<Badge
										className={`flex items-center border border-gray-200 hover:text-white hover:cursor-pointer w-fit ${getStatusColor(item.status)}`}
									>
										{getStatusIcon(item.status)}
										{item.status}
									</Badge>
								</TableCell>
								<TableCell>
									{item.status !== "Approved" &&
										item.status !== "On Dispute" && (
											<div className="flex gap-2">
												<Button variant="destructive" size="sm">
													Start dispute
												</Button>
												<Button
													variant="default"
													size="sm"
													className="bg-green-600 hover:bg-green-700"
												>
													Approve
												</Button>
											</div>
										)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		);
	};

	return (
		<Card className="w-full max-w-7xl mx-auto p-4">
			<div className="space-y-4">
				<div className="flex flex-col md:flex-row gap-4">
					<div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
						{tabs.map((tab) => (
							<Button
								key={tab}
								variant={activeTab === tab ? "default" : "outline"}
								className="whitespace-nowrap"
								onClick={() => setActiveTab(tab)}
							>
								{tab}
							</Button>
						))}
					</div>
					<div className="relative justify-end flex flex-1">
						<Search className="absolute left-2 md:left-[52%] top-2.5 h-4 w-4 text-gray-500" />
						<Input
							placeholder="Search products..."
							className="pl-8 w-full md:w-[50%] bg-gray-200"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>

				{renderContent()}

				<div className="text-sm text-gray-600">
					Total Shopping: {filteredData.length}
				</div>

				<Dialog
					open={!!selectedOrder}
					onOpenChange={() => setSelectedOrder(null)}
				>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Order Details</DialogTitle>
							<DialogClose className="absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100"></DialogClose>
						</DialogHeader>
						{selectedOrder && <OrderDetails order={selectedOrder} />}
					</DialogContent>
				</Dialog>
			</div>
		</Card>
	);
};

export default ShoppingTable;
