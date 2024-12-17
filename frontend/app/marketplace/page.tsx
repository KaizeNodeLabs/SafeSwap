"use client";

import { CirclePlus } from "lucide-react";
import BreadcrumbNavigation from "../components/ui/breadcrumb-navigation";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import ProductUploadModal from "../components/ui/product-upload-modal";
import { Product } from "@/entities/Product";
import ProductDetailModal from "../components/products/ProductDetailModal";
import { ProductList } from "../products/page";

export default function Marketplace() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center px-6 mt-4">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation />

        {/* Add Product Button */}
        <Button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2"
        >
          <CirclePlus className="w-5 h-5" />
          Add Product
        </Button>
      </div>

      <ProductList />

      <ProductUploadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <ProductDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </>
  );
}
