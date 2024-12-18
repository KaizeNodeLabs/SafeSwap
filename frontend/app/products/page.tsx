import { Card } from "@radix-ui/themes";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Eye, MessageSquareMore, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ProductsPagination } from "../components/marketplace";
import { products } from "@/constants/testDataProduct";
import Bounded from "../components/Bounded";
import SubHeader from "../components/header/subheader/SubHeader";

export const ProductList = () => {
  // const filteredProducts = products.filter(
  //   (product) =>
  //     (searchTerm === "" ||
  //       product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
  //     (selectedCategories.length === 0 ||
  //       selectedCategories.includes(product.category)) &&
  //     product.price >= priceRange[0] &&
  //     product.price <= priceRange[1]
  // );

  return (
    <>
      <SubHeader name="Product" />
      <Bounded title="Products">
        {products?.map((product) => (
          <Card key={product.id} className="hover:shadow-lg">
            <CardHeader>
              <div className="relative aspect-square max-w-cl">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  width={320}
                  height={320}
                  priority
                  className="rounded-t-lg h-[320px]"
                />
              </div>
              <CardTitle className="text-xl font-medium">
                {product.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-500">{product.category}</p>
              <span className="text-3xl font-bold">${product.price}</span>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 items-center flex-wrap">
              <div className="flex flex-col m-auto">
                <Button className="mb-4 bg-black">
                  <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Add to Cart
                </Button>
                <div className="flex flex-row justify-around gap-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow h-9 text-[16px] !bg-[#F5F5F5] !text-black border border-[#D1D1D1] px-4 py-2 hover:bg-[#E0E0E0] hover:border-[#B3B3B3]"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    More Details
                  </Link>
                  <Button className="text-[16px] !bg-[#F5F5F5] !text-black border border-[#D1D1D1] px-4 py-2 hover:bg-[#E0E0E0] hover:border-[#B3B3B3]">
                    <MessageSquareMore className="mr-2 h-4 w-4" /> Chat with
                    Seller
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
        <ProductsPagination />
      </Bounded>
    </>
  );
};
