export const GET_PRODUCTS = async () => {
	try {
		const response = await fetch("/api/products");
		if (!response.ok) throw new Error("Failed to fetch products");
		return await response.json();
	} catch (error) {
		console.error("Error fetching products:", error);
		return null;
	}
};

export const GET_CATEGORIES = async () => {
	try {
		const response = await fetch("/api/products/categories");
		if (!response.ok) throw new Error("Failed to fetch categories");
		return await response.json();
	} catch (error) {
		console.error("Error fetching categories:", error);
		return null;
	}
};

export const GET_PRODUCT_IMAGES = async () => {
	try {
		const response = await fetch("/api/products/images");
		if (!response.ok) throw new Error("Failed to fetch product images");
		return await response.json();
	} catch (error) {
		console.error("Error fetching product images:", error);
		return null;
	}
};
