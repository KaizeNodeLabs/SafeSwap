export type TabType =
	| "All"
	| "Pending"
	| "On Dispute"
	| "For Review"
	| "Approved";

export interface ShoppingData {
	date: string;
	product: string;
	id: string;
	price: number;
	seller: string;
	status: string;
}
