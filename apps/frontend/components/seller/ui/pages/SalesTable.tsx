"use client";

import { Button } from "@/components/ui/button";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useTranslations } from "@/hooks/useTranslations";
import { products } from "@/lib/mocks/products";
import { Check, ChevronDown, ChevronRight, Clock, Eye } from "lucide-react";
import { useState } from "react";
import React from "react";
import { milestones } from "../../mock/milestones.mock";

type StatusType = "approved" | "pending" | "forReview" | "onDispute";

// we map the products to sales
const sales = products.map((product) => ({
	id: product.id.toString(),
	date: "2025-02-19", //theres no date in the product object
	product: product.name,
	price: product.price,
	buyer: "0x1234...5678", //mock buyer address
	status: (product.id === 1 ? "forReview" : "approved") as StatusType,
	milestones:
		product.id === 1
			? [
					{ date: "2025-02-19", name: "orderPlaced", status: "approved" },
					{ date: "2025-02-19", name: "paymentConfirmed", status: "approved" },
					{ date: "2025-02-20", name: "productShipped", status: "pending" },
					{ date: "2025-02-22", name: "deliveryExpected", status: "forReview" },
				]
			: undefined,
}));

export function SalesTable() {
	const [expandedRow, setExpandedRow] = useState<string | null>(null);
	const { t } = useTranslations();

	const getStatusBadge = (status: StatusType) => {
		const badgeClasses: Record<StatusType, string> = {
			approved: "bg-black text-white dark:bg-white dark:text-black",
			pending:
				"bg-white border-gray-200 text-gray-600 border dark:bg-black dark:border-gray-700 dark:text-gray-300",
			forReview:
				"bg-white border-gray-200 text-gray-600 border dark:bg-black dark:border-gray-700 dark:text-gray-300",
			onDispute:
				"bg-white border-red-200 text-red-500 border dark:bg-black dark:border-red-700 dark:text-red-400",
		};

		const icons = {
			approved: <Check className="w-3.5 h-3.5" />,
			pending: <Clock className="w-3.5 h-3.5" />,
			forReview: <Eye className="w-3.5 h-3.5" />,
			onDispute: null,
		};

		return (
			<div
				className={`text-xs font-medium rounded-full flex items-center justify-center px-3 py-1.5 gap-1.5 w-28 ${badgeClasses[status]}`}
			>
				{icons[status]}
				{t(`Sales.status.${status}`)}
			</div>
		);
	};

	return (
		<div className="border rounded-lg bg-white dark:bg-black dark:border-gray-800">
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent dark:hover:bg-transparent">
							<TableHead className="w-[50px] dark:text-gray-400" />
							<TableHead className="font-medium text-sm text-gray-500 dark:text-gray-400">
								{t("Sales.table.shoppingDate")}
							</TableHead>
							<TableHead className="font-medium text-sm text-gray-500 dark:text-gray-400">
								{t("Sales.table.productName")}
							</TableHead>
							<TableHead className="font-medium text-sm text-gray-500 dark:text-gray-400">
								{t("Sales.table.shoppingId")}
							</TableHead>
							<TableHead className="font-medium text-sm text-gray-500 dark:text-gray-400">
								{t("Sales.table.price")}
							</TableHead>
							<TableHead className="font-medium text-sm text-gray-500 dark:text-gray-400">
								{t("Sales.table.buyer")}
							</TableHead>
							<TableHead className="font-medium text-sm text-gray-500 dark:text-gray-400">
								{t("Sales.table.escrowStatus")}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sales.map((sale) => (
							<React.Fragment key={sale.id}>
								<TableRow className="group dark:hover:bg-black/50">
									<TableCell className="py-4 align-middle">
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 dark:hover:bg-black"
											onClick={() =>
												setExpandedRow(expandedRow === sale.id ? null : sale.id)
											}
										>
											{expandedRow === sale.id ? (
												<ChevronDown className="h-4 w-4" />
											) : (
												<ChevronRight className="h-4 w-4" />
											)}
										</Button>
									</TableCell>
									<TableCell className="py-4 align-middle text-sm dark:text-gray-300">
										{sale.date}
									</TableCell>
									<TableCell className="py-4 align-middle font-medium text-sm dark:text-gray-200">
										{sale.product}
									</TableCell>
									<TableCell className="py-4 align-middle text-blue-600 dark:text-blue-400 text-sm">
										{sale.id}
									</TableCell>
									<TableCell className="py-4 align-middle text-sm dark:text-gray-300">
										${sale.price}
									</TableCell>
									<TableCell className="py-4 align-middle text-sm dark:text-gray-300">
										{sale.buyer}
									</TableCell>
									<TableCell className="py-4 align-middle">
										{getStatusBadge(sale.status)}
									</TableCell>
								</TableRow>
								{expandedRow === sale.id && sale.milestones && (
									<TableRow className="dark:bg-black/50">
										<TableCell
											colSpan={7}
											className="p-0 border-b dark:border-gray-700"
										>
											<div className="py-4 px-14">
												<h4 className="font-medium mb-4 text-sm dark:text-gray-200">
													Milestones
												</h4>
												<div className="space-y-4">
													{sale.milestones.map((milestone, index) => (
														<div
															key={`${sale.id}-milestone-${index}`}
															className="grid grid-cols-[100px_1fr_200px] gap-4 items-center"
														>
															<div className="text-sm text-gray-500 dark:text-gray-400">
																{milestone.date}
															</div>
															<div className="text-sm font-medium dark:text-gray-300">
																{t(`Sales.milestones.${milestone.name}`)}
															</div>
															<div className="flex items-center justify-end gap-4">
																{milestone.status === "pending" && (
																	<Button
																		className="bg-green-600 hover:bg-green-700 text-xs h-8 text-white dark:bg-green-700 dark:hover:bg-green-600"
																		size="sm"
																	>
																		{t("Sales.milestones.complete")}
																	</Button>
																)}
																{getStatusBadge(milestone.status as StatusType)}
															</div>
														</div>
													))}
												</div>
											</div>
										</TableCell>
									</TableRow>
								)}
							</React.Fragment>
						))}
					</TableBody>
				</Table>
			</div>
			<div className="p-4 border-t dark:border-gray-700">
				<p className="text-sm text-muted-foreground dark:text-gray-400">
					{t("Sales.total")}: {sales.length}
				</p>
			</div>
		</div>
	);
}
