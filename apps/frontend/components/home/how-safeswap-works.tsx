import { Card, CardContent } from "@/components/ui/card";
import { Package, Search, ShieldCheck } from "lucide-react";

export function HowSafeSwapWorks() {
	return (
		<section className="flex flex-col items-center py-12 px-4 md:px-8 dark:bg-white/5 bg-black/5">
			<h2 className="text-2xl font-bold mb-8 text-center">
				How SafeSwap Works
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
				{/** Step 1 */}
				<Card className="text-center p-6 border-none shadow-none">
					<CardContent className="flex flex-col items-center">
						<div className="rounded-full w-14 h-14 flex items-center justify-center bg-primary">
							<Search size={35} className="text-primary-foreground" />
						</div>
						<h3 className="text-lg font-semibold mt-4">
							Browse & Select Products
						</h3>
						<p className="text-muted-foreground mt-2">
							Explore our wide range of products and choose what you like.
						</p>
					</CardContent>
				</Card>

				{/** Step 2 */}
				<Card className="text-center p-6 border-none shadow-none">
					<CardContent className="flex flex-col items-center">
						<div className="rounded-full w-14 h-14 flex items-center justify-center bg-primary">
							<ShieldCheck size={35} className="text-primary-foreground" />
						</div>
						<h3 className="text-lg font-semibold mt-4">
							Secure Payment with Escrow
						</h3>
						<p className="text-muted-foreground mt-2">
							Pay safely using our Blockchain-powered escrow system.
						</p>
					</CardContent>
				</Card>

				{/** Step 3 */}
				<Card className="text-center p-6 border-none shadow-none">
					<CardContent className="flex flex-col items-center">
						<div className="rounded-full w-14 h-14 flex items-center justify-center bg-primary">
							<Package size={35} className="text-primary-foreground" />
						</div>
						<h3 className="text-lg font-semibold mt-4">
							Receive Your Product Safely
						</h3>
						<p className="text-muted-foreground mt-2">
							Get your product delivered and release the payment when satisfied.
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
