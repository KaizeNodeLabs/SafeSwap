export function generateProductSlug(productName: string): string {
	return productName
		.toLowerCase()
		.replace(/\s+/g, "_")
		.replace(/[^\w_]/g, "");
}
