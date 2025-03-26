export interface Product {
	images: { src: string; alt: string }[];
	condition: string;
	id: string;
	name: string;
	slug: string;
	description?: string;
	price: number;
	categoryId: string;
	createdAt: string;
	updatedAt: string;
}

export interface Category {
	id: string;
	name: string;
	imageUrl: string;
}

export interface ProductImage {
	id: string;
	productId: string;
	imageUrl: string;
}

export interface FormattedProduct {
	condition: string[];
	id: string;
	name: string;
	slug?: string;
	price: number;
	category: string;
	images: {
		src: string;
		alt: string;
	}[];
}
export interface ProductsData {
	products: Product[];
}

export interface CategoriesData {
	categories: Category[];
}

export interface ProductImagesData {
	productImages: ProductImage[];
}

export type Shopping = {
	id: number;
	name: string;
	price: number;
	category: string;
	categoryId?: string;
	description: string;
	images: {
		src: string;
		alt: string;
	}[];
	starts: number;
};
