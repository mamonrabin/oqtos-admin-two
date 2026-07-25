/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BASE_URL } from "@/config";
import { useAllBrands } from "@/hooks/brand.hook";
import { useAllCategories } from "@/hooks/category.hook";
import { useAllSubCategories } from "@/hooks/subCategory.hook";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import MultipleImageUpload from "@/reuseble_components/MultipleImageUpload";
import RichTextEditor from "@/reuseble_components/RichTextEditor";
import SelectInput from "@/reuseble_components/SelectInput";
import TagInput from "@/reuseble_components/TagInput";
import { TBrand, TCategory, TProduct, TSubCategory } from "@/types";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import React, { useState} from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { CreateInventeryType } from "./CreateInventeryType";
import { useUpdateProduct } from "@/hooks/product.hook";
import { toast } from "sonner";

interface productProps {
  product: TProduct;
  refetch?: () => void;
}

type EditFormData = {
  title: string;
  description: string;
  specifications: {
    key: string;
    value: string;
  }[];
  thumbnailImage: FileList;
  backviewImage: FileList;
  images: FileList;
  mrpPrice: string;
  discountType: string;
  discount: string;
  freeShipping: string;
  category: string;
  subCategory: string;
  brand: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  inventoryType: string;
  inventories: {
    color?: string;
    colorName?: string;
    size?: string;
    quantity: string;
  }[];
};

const EditProduct: React.FC<productProps> = ({ product, refetch }) => {
  const discountType = [
    { label: "Flat", value: "flat" },
    { label: "Percentage", value: "percentage" },
  ];
  const shipping = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const labels = [
    { label: "New", value: "New" },
    { label: "Trending", value: "Trending" },
    { label: "Limited Stock", value: "Limited Stock" },
    { label: "Featured", value: "Featured" },
    { label: "Best Sellers", value: "Best Sellers" },
  ];

  const { data: categorysList } = useAllCategories();
  const { data: subcategorysList } = useAllSubCategories();
  const { data: brandsList } = useAllBrands();
  const { mutate: updateProductMutation, isPending } = useUpdateProduct();

  const categories = categorysList?.data?.data;
  const subcategories = subcategorysList?.data?.data;
  const brands = brandsList?.data?.data;

  const [selectedCategory, setSelectedCategory] = useState<string>(
    product.category?._id || ""
  );
  const [open, setOpen] = useState(false);

  const filteredSubCategories = selectedCategory
    ? subcategories?.filter(
        (sub: TSubCategory) => sub.category._id === selectedCategory
      )
    : [];

  // Prepare default inventory values
  const getDefaultInventory = () => {
    if (product.inventories && product.inventories.length > 0) {
      return product.inventories.map((inv: any) => ({
        color: inv.color || "",
        colorName: inv.colorName || "",
        size: inv.size || "",
        quantity: String(inv.quantity || ""),
      }));
    }
    return [{ color: "", colorName: "", size: "", quantity: "" }];
  };

  // Prepare default specifications
  const getDefaultSpecifications = () => {
    if (product.specifications && product.specifications.length > 0) {
      return product.specifications.filter(
        (spec) => spec.key || spec.value
      );
    }
    return [{ key: "", value: "" }];
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<EditFormData>({
    defaultValues: {
      title: product.title || "",
      description: product.description || "",
      specifications: getDefaultSpecifications(),
      mrpPrice: String(product.mrpPrice || ""),
      discountType: product.discountType || "",
      discount: String(product.discount || ""),
      freeShipping: product.freeShipping ? "yes" : "no",
      category: product.category?._id || "",
      subCategory: product.subCategory?._id || "",
      brand: product.brand?._id || "",
      label: product.label || "",
      metaTitle: product.metaTitle || "",
      metaDescription: product.metaDescription || "",
      tags: product.tags || [],
      inventoryType: product.inventoryType || "",
      inventories: getDefaultInventory(),
    },
  });

  const {
    fields: specificationFields,
    append: appendSpecification,
    remove: removeSpecification,
  } = useFieldArray({
    control,
    name: "specifications",
  });

//   const onSubmit: SubmitHandler<EditFormData> = (data) => {
//     const formData = new FormData();

//     // Core fields
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("mrpPrice", data.mrpPrice);
//     formData.append("category", data.category);

//     if (data.discountType) formData.append("discountType", data.discountType);
//     if (data.subCategory) formData.append("subCategory", data.subCategory);
//     if (data.brand) formData.append("brand", data.brand);
//     if (data.label) formData.append("label", data.label);
//     formData.append("freeShipping", data.freeShipping === "yes" ? "true" : "false");
//     formData.append("discount", data.discount || "0");

//     // Images - only append if new files are selected
//     if (data.thumbnailImage && data.thumbnailImage.length > 0) {
//       formData.append("thumbnailImage", data.thumbnailImage[0]);
//     }

//     if (data.backviewImage && data.backviewImage.length > 0) {
//       formData.append("backviewImage", data.backviewImage[0]);
//     }

//     if (data.images && data.images.length > 0) {
//       Array.from(data.images).forEach((file) => {
//         formData.append("images", file);
//       });
//     }

//     // Inventory
//     if (data.inventoryType) {
//       formData.append("inventoryType", data.inventoryType);
//     }

//     if (data.inventories && data.inventories.length > 0) {
//   // Filter out empty inventory items
//   const validInventories = data.inventories.filter(
//     (inv) => inv.quantity && Number(inv.quantity) > 0
//   );

//   if (validInventories.length > 0) {
//     validInventories.forEach((inv, index) => {
//       if (inv.color) formData.append(`inventories[${index}][color]`, inv.color);
//       if (inv.colorName) formData.append(`inventories[${index}][colorName]`, inv.colorName);
//       if (inv.size) formData.append(`inventories[${index}][size]`, inv.size);
//       if (inv.quantity) formData.append(`inventories[${index}][quantity]`, inv.quantity);
//     });
//   }
// }

//     // Specifications - filter out empty ones
//     if (data.specifications) {
//       const specs = data.specifications.filter(
//         (spec) => spec.key.trim() || spec.value.trim()
//       );
//       if (specs.length > 0) {
//         formData.append("specifications", JSON.stringify(specs));
//       }
//     }

//     // if (data.tags && data.tags.length > 0) {
//     //   formData.append("tags", JSON.stringify(data.tags));
//     // }

//     if (data.tags && data.tags.length > 0) {
//   data.tags.forEach((tag, index) => {
//     formData.append(`tags[${index}]`, tag);
//   });
// }

//     if (data.metaTitle) formData.append("metaTitle", data.metaTitle);
//     if (data.metaDescription)
//       formData.append("metaDescription", data.metaDescription);

//     updateProductMutation(
//       { id: product._id, formData },
//       {
//         onSuccess: (res) => {
//           toast.success(res?.message || "Product updated successfully");
//           setOpen(false);
//           if (refetch) refetch();
//         },
//         onError: (error: any) => {
//           toast.error(
//             error?.response?.data?.message ||
//               "Something went wrong. Please try again."
//           );
//         },
//       }
//     );
//   };

  // Reset form when product changes or sheet opens
  // useEffect(() => {
  //   if (open) {
  //     reset({
  //       title: product.title || "",
  //       description: product.description || "",
  //       specifications: getDefaultSpecifications(),
  //       mrpPrice: String(product.mrpPrice || ""),
  //       discountType: product.discountType || "",
  //       discount: String(product.discount || ""),
  //       freeShipping: product.freeShipping ? "yes" : "no",
  //       category: product.category?._id || "",
  //       subCategory: product.subCategory?._id || "",
  //       brand: product.brand?._id || "",
  //       label: product.label || "",
  //       metaTitle: product.metaTitle || "",
  //       metaDescription: product.metaDescription || "",
  //       tags: product.tags || [],
  //       inventoryType: product.inventoryType || "",
  //       inventories: getDefaultInventory(),
  //     });
  //     setSelectedCategory(product.category?._id || "");
  //   }
  // }, [open, product]);

  const onSubmit: SubmitHandler<EditFormData> = (data) => {
  const formData = new FormData();

  // Core fields
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("mrpPrice", data.mrpPrice);
  formData.append("category", data.category);

  if (data.discountType) formData.append("discountType", data.discountType);
  if (data.subCategory) formData.append("subCategory", data.subCategory);
  if (data.brand) formData.append("brand", data.brand);
  if (data.label) formData.append("label", data.label);
  formData.append("freeShipping", data.freeShipping === "yes" ? "true" : "false");
  formData.append("discount", data.discount || "0");

  // Images
  if (data.thumbnailImage && data.thumbnailImage.length > 0) {
    formData.append("thumbnailImage", data.thumbnailImage[0]);
  }
  if (data.backviewImage && data.backviewImage.length > 0) {
    formData.append("backviewImage", data.backviewImage[0]);
  }
  if (data.images && data.images.length > 0) {
    Array.from(data.images).forEach((file) => {
      formData.append("images", file);
    });
  }

  // INVENTORY - Send as individual fields
  if (data.inventoryType) {
    formData.append("inventoryType", data.inventoryType);
  }
  if (data.inventories && data.inventories.length > 0) {
    const validInventories = data.inventories.filter(
      (inv) => inv.quantity && Number(inv.quantity) > 0
    );
    if (validInventories.length > 0) {
      validInventories.forEach((inv, index) => {
        if (inv.color) formData.append(`inventories[${index}][color]`, inv.color);
        if (inv.colorName) formData.append(`inventories[${index}][colorName]`, inv.colorName);
        if (inv.size) formData.append(`inventories[${index}][size]`, inv.size);
        if (inv.quantity) formData.append(`inventories[${index}][quantity]`, inv.quantity);
      });
    }
  }

  // SPECIFICATIONS - FIXED: Send as individual fields
  if (data.specifications) {
    const validSpecs = data.specifications.filter(
      (spec) => spec.key.trim() && spec.value.trim()
    );
    if (validSpecs.length > 0) {
      validSpecs.forEach((spec, index) => {
        formData.append(`specifications[${index}][key]`, spec.key);
        formData.append(`specifications[${index}][value]`, spec.value);
      });
    }
  }

  // TAGS - Send as individual fields
  if (data.tags && data.tags.length > 0) {
    data.tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
  }

  if (data.metaTitle) formData.append("metaTitle", data.metaTitle);
  if (data.metaDescription) formData.append("metaDescription", data.metaDescription);

  // Submit
  updateProductMutation(
    { id: product._id, formData },
    {
      onSuccess: (res) => {
        toast.success(res?.message || "Product updated successfully");
        setOpen(false);
        if (refetch) refetch();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      },
    }
  );
};



  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-200">
            <SquarePen size={16} />
          </button>
        </SheetTrigger>
        <SheetContent className="md:!max-w-4xl !w-full p-0 overflow-y-auto max-h-screen">
          <div className="border-b py-4 px-8 sticky top-0 bg-white z-10">
            <h2 className="md:text-lg text-base font-medium capitalize">
              Update Product
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pt-4 px-8 pb-8"
          >
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  label="Product Title"
                  name="title"
                  type="text"
                  register={register}
                  placeholder="Enter product title"
                  error={errors.title}
                  
                  inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <div>
                  <p className="text-sm font-medium text-gray-700 pb-2">
                    Product Description <span className="text-red-500">*</span>
                  </p>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                  Specifications
                </h3>
                <button
                  type="button"
                  onClick={() => appendSpecification({ key: "", value: "" })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  Add Specification
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {specificationFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-col sm:flex-row gap-3 items-start sm:items-end bg-white p-3 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1 w-full">
                      <InputField
                        label="Key"
                        name={`specifications.${index}.key`}
                        type="text"
                        placeholder="e.g. Material"
                        register={register}
                        inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1 w-full">
                      <InputField
                        label="Value"
                        name={`specifications.${index}.value`}
                        type="text"
                        placeholder="e.g. Cotton"
                        register={register}
                        inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {specificationFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="h-10 px-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors flex items-center gap-1.5 text-sm font-medium"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {specificationFields.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">
                    No specifications added. Click Add Specification to start.
                  </p>
                )}
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-4 mt-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                Product Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <ImageUpload
                    label="Front View"
                    name="thumbnailImage"
                    existingImage={
                      product.thumbnailImage
                        ? `${BASE_URL}${product.thumbnailImage}`
                        : undefined
                    }
                    register={register}
                    watch={watch}
                    error={errors.thumbnailImage}
                    
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Leave empty to keep current image
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <ImageUpload
                    label="Back View"
                    name="backviewImage"
                    existingImage={
                      product.backviewImage
                        ? `${BASE_URL}${product.backviewImage}`
                        : undefined
                    }
                    watch={watch}
                    register={register}
                    error={errors.backviewImage}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Leave empty to keep current image
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <MultipleImageUpload
                    label="Additional Images"
                    name="images"
                    register={register}
                    error={errors.images}
                    existingImages={
                      product.images?.map((img) => `${BASE_URL}${img}`) || []
                    }
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Leave empty to keep current images
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing & Shipping */}
            <div className="space-y-4 mt-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                Pricing & Shipping
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <InputField
                  label="MRP Price"
                  name="mrpPrice"
                  type="text"
                  placeholder="Enter MRP"
                  register={register}
                  error={errors.mrpPrice}
                  
                  inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <SelectInput<EditFormData>
                  label="Discount Type"
                  name="discountType"
                  options={discountType}
                  control={control}
                  error={errors.discountType}
                  inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <InputField
                  label="Discount Amount"
                  name="discount"
                  type="text"
                  placeholder="Enter discount"
                  register={register}
                  error={errors.discount}
                  inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <SelectInput<EditFormData>
                  label="Free Shipping"
                  name="freeShipping"
                  options={shipping}
                  control={control}
                  error={errors.freeShipping}
                  inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Classification */}
            <div className="space-y-4 mt-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                Classification
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectInput<EditFormData>
                  label="Category"
                  name="category"
                  options={categories?.map((category: TCategory) => ({
                    label: category.categoryName,
                    value: category._id,
                  }))}
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                    setValue("subCategory", "");
                  }}
                  control={control}
                  error={errors.category}
                  
                  inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <SelectInput<EditFormData>
                  label="Sub-Category"
                  name="subCategory"
                  disabled={!selectedCategory}
                  options={filteredSubCategories?.map(
                    (subcategory: TSubCategory) => ({
                      label: subcategory.subcategoryName,
                      value: subcategory._id,
                    })
                  )}
                  control={control}
                  error={errors.subCategory}
                  inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <SelectInput<EditFormData>
                  label="Brand"
                  name="brand"
                  options={brands?.map((brand: TBrand) => ({
                    label: brand.title,
                    value: brand._id,
                  }))}
                  control={control}
                  error={errors.brand}
                  inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Labels & Tags */}
            <div className="space-y-4 mt-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                Labels & Tags
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectInput<EditFormData>
                  label="Product Label"
                  name="label"
                  options={labels}
                  control={control}
                  error={errors.label}
                  inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <TagInput<EditFormData>
                  name="tags"
                  label="Product Tags"
                  setValue={setValue}
                  defaultTags={product.tags || []}
                />
              </div>
            </div>

            {/* Inventory */}
            <div className="space-y-4 mt-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                Inventory
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <CreateInventeryType
                  control={control}
                  register={register}
                  watch={watch}
                  defaultInventoryType={product.inventoryType}
                  defaultInventories={product.inventories}
                />
              </div>
            </div>

            {/* SEO Settings */}
            <div className="space-y-4 mt-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                SEO Settings
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4">
                <InputField
                  label="Meta Title"
                  name="metaTitle"
                  type="text"
                  register={register}
                  placeholder="Enter meta title for SEO"
                  inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <InputField
                  label="Meta Description"
                  name="metaDescription"
                  type="text"
                  register={register}
                  placeholder="Enter meta description for SEO"
                  inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200 mt-6 sticky bottom-0 bg-white">
              <button
                disabled={isPending}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating Product...
                  </span>
                ) : (
                  "Update Product"
                )}
              </button>
              <p className="text-xs text-gray-400 mt-2">* Required fields</p>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditProduct;