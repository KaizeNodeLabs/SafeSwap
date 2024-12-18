"use client";

import { Button } from "@radix-ui/themes";
import BreadcrumbNavigation from "../../ui/breadcrumb-navigation";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import ProductUploadModal from "../../ui/product-upload-modal";

interface SubHeaderProps {
  name: string;
}

const SubHeader = ({ name }: SubHeaderProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center px-6 mt-4">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation />

        <Button
          className="flex items-center gap-2 bg-black cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <CirclePlus className="w-5 h-5" />
          Add {name}
        </Button>
      </div>

      <ProductUploadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default SubHeader;
