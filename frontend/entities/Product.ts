export interface Product {
  id: number;
  images: { src: string; alt: string }[];
  name: string;
  price: number;
  description: string;
  category: string;
  starts: number;
}

export interface ProductListProps {
  products: Product[];
}
