"use client";

import {
	SalesByDay,
	TimeRange,
} from "@/components/seller/mock/sales-analytics.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import {
	Line,
	LineChart,
	TooltipProps as RechartsTooltipProps,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface SalesChartProps {
	data: SalesByDay[];
	timeRange: TimeRange;
}

export function SalesChart({ data, timeRange }: SalesChartProps) {
	const t = useTranslations();
	const getTitle = () => {
		return (
			t(`Sales.analytics.salesChart.title.${timeRange}`) ||
			t("Sales.analytics.salesChart.title.default")
		);
	};

	return (
		<Card className="col-span-4">
			<CardHeader className="mb-4">
				<CardTitle className="text-2xl font-semibold">{getTitle()}</CardTitle>
				<p className="text-sm text-muted-foreground pl-4">
					{t("Sales.analytics.salesChart.subtitle")}
				</p>
			</CardHeader>
			<CardContent className="h-[300px]">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data}>
						<XAxis
							dataKey="date"
							tickFormatter={(value: string) =>
								new Date(value).getDate().toString()
							}
							stroke="#888888"
							fontSize={12}
						/>
						<YAxis
							stroke="#888888"
							fontSize={12}
							tickFormatter={(value: number) => `$${value}`}
						/>
						<Tooltip
							content={({
								active,
								payload,
							}: RechartsTooltipProps<number, string>) => {
								if (active && payload && payload.length) {
									const data = payload[0].payload as SalesByDay;
									return (
										<div className="rounded-lg border bg-background p-2 shadow-sm">
											<div className="grid grid-cols-2 gap-2">
												<div className="flex flex-col">
													<span className="text-[0.70rem] uppercase text-muted-foreground">
														{t("Sales.analytics.salesChart.tooltip.date")}
													</span>
													<span className="font-bold text-muted-foreground">
														{new Date(data.date).toLocaleDateString()}
													</span>
												</div>
												<div className="flex flex-col">
													<span className="text-[0.70rem] uppercase text-muted-foreground">
														{t("Sales.analytics.salesChart.tooltip.sales")}
													</span>
													<span className="font-bold">${data.sales}</span>
												</div>
											</div>
										</div>
									);
								}
								return null;
							}}
						/>
						<Line
							type="monotone"
							dataKey="sales"
							strokeWidth={2}
							activeDot={{
								r: 4,
								style: { fill: "hsl(var(--primary))" },
							}}
							style={{
								stroke: "hsl(var(--primary))",
							}}
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
