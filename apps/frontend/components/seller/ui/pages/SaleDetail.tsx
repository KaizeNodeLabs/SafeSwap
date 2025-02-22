import { Copy, Mail, Printer, ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "@/hooks/useTranslations";
import { saleData } from "../../mock/sale.mock";
import { ChatComponent } from "../utils/Chat";
import { MilestonesTimeline } from "../utils/Milestones";
import { useSaleDetail } from "./hooks/sale-detail.hook";

export default function SaleDetailPage() {
	const { copied, handleCopy } = useSaleDetail();
	const { t } = useTranslations();

	return (
		<div className="container mx-auto px-6 py-2 space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="flex items-center gap-2 text-2xl font-semibold">
					<ShoppingBag />
					{t("saleDetails.title")}
				</h1>
				<div className="flex gap-2">
					<Button variant="outline" size="sm" onClick={handleCopy}>
						<Copy className="h-4 w-4 mr-2" />
						{copied ? t("saleDetails.copied") : t("saleDetails.copyId")}
					</Button>
					<Button variant="outline" size="sm">
						<Printer className="h-4 w-4 mr-2" />
						{t("saleDetails.print")}
					</Button>
					<Button variant="outline" size="sm">
						<Mail className="h-4 w-4 mr-2" />
						{t("saleDetails.email")}
					</Button>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle className="my-4">{saleData.title}</CardTitle>
						<p className="text-sm text-muted-foreground px-4 mb-2">
							{saleData.description}
						</p>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									{t("saleDetails.saleId")}
								</span>
								<span className="font-medium">{saleData.id}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									{t("saleDetails.buyerAddress")}
								</span>
								<span className="font-medium">{saleData.buyerAddress}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									{t("saleDetails.status")}
								</span>
								<Badge variant="secondary">{saleData.status}</Badge>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									{t("saleDetails.dateTime")}
								</span>
								<span className="font-medium">{saleData.dateTime}</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="my-4">
							{t("saleDetails.financialDetails")}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									{t("saleDetails.amount")}
								</span>
								<span className="font-medium">
									${saleData.amount.toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									{t("saleDetails.fees")}
								</span>
								<span className="font-medium">${saleData.fees.toFixed(2)}</span>
							</div>
							<Separator />
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									{t("saleDetails.balance")}
								</span>
								<span className="font-medium">
									${saleData.balance.toFixed(2)}
								</span>
							</div>
						</div>
						<Button className="w-full mt-4">
							{t("saleDetails.signRelease")}
						</Button>
					</CardContent>
				</Card>

				<Card className="md:col-span-2 lg:col-span-1">
					<CardHeader>
						<CardTitle className="my-4">{t("saleDetails.chat")}</CardTitle>
					</CardHeader>
					<CardContent>
						<ChatComponent />
					</CardContent>
				</Card>
			</div>

			<Card className="w-2/3">
				<CardHeader>
					<CardTitle className="my-4">{t("saleDetails.milestones")}</CardTitle>
				</CardHeader>
				<CardContent>
					<MilestonesTimeline />
				</CardContent>
			</Card>
		</div>
	);
}
