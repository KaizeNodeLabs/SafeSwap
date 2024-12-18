import Bounded from "@/app/components/Bounded";
import SubHeader from "@/app/components/header/subheader/SubHeader";
import Images from "@/app/components/products/Images";
import { products } from "@/constants/testDataProduct";
import { Product } from "@/entities/Product";
import { Button } from "@radix-ui/themes";
import { Share2, ShoppingCart } from "lucide-react";

interface ProductDetailsProps {
  params: {
    productId: string;
  };
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
  const getProductById = (id: number): Product | undefined => {
    return products.find((product) => product.id === id);
  };

  const product = getProductById(parseInt(params.productId));

  return (
    <>
      <SubHeader name="Product" />
      <Bounded title="Product Details">
        <div className="flex justify-center w-2/3 gap-10 mx-auto py-10">
          {product && (
            <section className="w-1/2">
              <Images images={product.images} />
            </section>
          )}

          <section className="w-1/2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product?.name}</h1>
              <p className="text-zinc-500 text-xl font-semibold mt-3">$98.00</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Category:</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {product?.category}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Quantity:</h3>
              <div className="flex items-center gap-2">
                <button className="border px-3 py-1 rounded hover:bg-gray-100">
                  -
                </button>
                <span>1</span>
                <button className="border px-3 py-1 rounded hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Description:</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {product?.description}
              </p>
            </div>

            <div className="flex justify-center items-center gap-3">
              <Button className="bg-black text-white w-9/12 cursor-pointer">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button className="bg-black text-white cursor-pointer">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </section>
        </div>
      </Bounded>
    </>
  );
};

export default ProductDetails;
