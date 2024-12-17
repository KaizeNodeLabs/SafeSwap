import { products } from "@/constants/testDataProduct";
import { Product } from "@/entities/Product";

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
      <h1>{product?.name}</h1>
    </>
  );
};

export default ProductDetails;
