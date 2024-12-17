"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { ShoppingCart, MessageSquareMore, ArrowLeft } from "lucide-react";
import Link from "next/link";
import BreadcrumbNavigation from "@/app/components/ui/breadcrumb-navigation";
import { Star } from "lucide-react";


interface Product {
    id: number;
    images: { src: string; alt: string }[];
    name: string;
    price: number;
    description: string;
    category: string;
  }

const products: Product[] = [
    {
        id: 1,
        name: "MacBook Pro 14",
        price: 1299,
        category: "Electronics",
        description: "The new MacBook Pro 14-inch with the M1 Pro chip.",
        images: [
          { src: "/images/macbook-pro-14.webp", alt: "MacBook Pro 14" },
          { src: "/images/macbook-pro-14.webp", alt: "MacBook Pro 14" },
          { src: "/images/macbook-pro-14.webp", alt: "MacBook Pro 14" },
        ],
      },
      {
        id: 2,
        name: "Samsung Galaxy S24 FE",
        price: 699,
        category: "Electronics",
        description: "The new Samsung Galaxy S24 FE with 5G support.",
        images: [
          {
            src: "/images/samsung-galaxy-s24-fe.webp",
            alt: "Samsung Galaxy S24 FE",
          },
          {
            src: "/images/samsung-galaxy-s24-fe.webp",
            alt: "Samsung Galaxy S24 FE",
          },
          {
            src: "/images/samsung-galaxy-s24-fe.webp",
            alt: "Samsung Galaxy S24 FE",
          },
        ],
      },
      {
        id: 3,
        name: "Ergonomic Chair",
        price: 299,
        category: "Furniture",
        description: "Ergonomic chair for your home office.",
        images: [
          { src: "/images/ergonomic-chair.jpg", alt: "Ergonomic Chair" },
          { src: "/images/ergonomic-chair.jpg", alt: "Ergonomic Chair" },
          { src: "/images/ergonomic-chair.jpg", alt: "Ergonomic Chair" },
        ],
      },
      {
        id: 4,
        name: "Coffee Maker",
        price: 89,
        category: "Appliances",
        description: "Coffee maker with built-in grinder.",
        images: [
          { src: "/images/coffee-maker.webp", alt: "Coffee Maker" },
          { src: "/images/coffee-maker.webp", alt: "Coffee Maker" },
          { src: "/images/coffee-maker.webp", alt: "Coffee Maker" },
        ],
      },
      {
        id: 5,
        name: "Running Shoes",
        price: 129,
        category: "Sports",
        description: "Running shoes for your daily workout.",
        images: [
          { src: "/images/running-shoes.jpg", alt: "Running Shoes" },
          { src: "/images/running-shoes.jpg", alt: "Running Shoes" },
          { src: "/images/running-shoes.jpg", alt: "Running Shoes" },
        ],
      },
      {
        id: 6,
        name: "Wireless Earbuds",
        price: 159,
        category: "Electronics",
        description: "Wireless earbuds with active noise cancellation.",
        images: [
          { src: "/images/wireless-earbuds.jpg", alt: "Wireless Earbuds" },
          { src: "/images/wireless-earbuds.jpg", alt: "Wireless Earbuds" },
          { src: "/images/wireless-earbuds.jpg", alt: "Wireless Earbuds" },
        ],
      },
];



export default function Product() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const product = products.find((p) => p.id === Number(productId));
  const rating = 4.3; 

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - (filledStars + halfStars);

    return [
      ...Array(filledStars).fill("filled"),
      ...Array(halfStars).fill("half"),
      ...Array(emptyStars).fill("empty"),
    ];
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/marketplace" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Link>
      </div>

      <BreadcrumbNavigation />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(1).map((image, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
         
           <div className="flex items-center">
            {renderStars(rating).map((star, index) => {
              if (star === "filled") {
                return <Star key={index} className="h-5 w-5 fill-yellow-400 text-yellow-400" />;
              } else if (star === "half") {
                return <Star key={index} className="h-5 w-5 text-yellow-400 opacity-50" />;
              } else {
                return <Star key={index} className="h-5 w-5 text-gray-300" />;
              }
            })}
            <span className="ml-2 text-sm text-gray-600">
              {rating.toFixed(1)} / 5
            </span>
          </div>
          <p className="text-gray-600">{product.category}</p>
          <p className="text-4xl font-bold">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>

          <div className="space-y-3">
            <Button className="w-full bg-black">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button className="w-full !bg-[#F5F5F5] !text-black border border-[#D1D1D1] hover:bg-[#E0E0E0] hover:border-[#B3B3B3]">
              <MessageSquareMore className="mr-2 h-4 w-4" />
              Chat with Seller
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}