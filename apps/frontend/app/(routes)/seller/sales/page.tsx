import { SalesHeader } from "@/components/seller/ui/pages/SalesHeader";
import { SalesTable } from "@/components/seller/ui/pages/SalesTable";


export default function SalesPage() {
	return (
		<div className="container py-6 space-y-6">
			<SalesHeader />
			<SalesTable />
		</div>
	);
}
