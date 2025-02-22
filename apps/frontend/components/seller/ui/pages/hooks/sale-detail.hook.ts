import { saleData } from "@/components/seller/mock/sale.mock";
import { useState } from "react";

export const useSaleDetail = () => {
	const [copied, setCopied] = useState(false);

	const copyId = () => {
		navigator.clipboard.writeText(saleData.id);
	};

	const handleCopy = () => {
		copyId();
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return {
		copied,
		handleCopy,
	};
};
