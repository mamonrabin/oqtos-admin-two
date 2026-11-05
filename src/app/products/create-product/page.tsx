import CreateProducts from "@/components/pages/product-management/CreateProducts";
import React from "react";

const CreateProduct = () => {
  return (
    <div className="flex flex-col gap-4  rounded md:px-8 md:py-8 px-2 py-4 shadow bg-secondary mt-8 relative bottom-4">
      <CreateProducts />
    </div>
  );
};

export default CreateProduct;
