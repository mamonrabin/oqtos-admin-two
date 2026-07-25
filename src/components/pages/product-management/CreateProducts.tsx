/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import MultipleImageUpload from "@/reuseble_components/MultipleImageUpload";
import RichTextEditor from "@/reuseble_components/RichTextEditor";
import SelectInput from "@/reuseble_components/SelectInput";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { CreateInventeryType } from "./CreateInventeryType";
import { useAllCategories } from "@/hooks/category.hook";
import { TBrand, TCategory, TSubCategory } from "@/types";
import { useAllSubCategories } from "@/hooks/subCategory.hook";
import { useAllBrands } from "@/hooks/brand.hook";
import { useCreateProduct } from "@/hooks/product.hook";
import { toast } from "sonner";
import TagInput from "@/reuseble_components/TagInput";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const CreateProducts = () => {
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
  const categories = categorysList?.data?.data;
  const subcategories = subcategorysList?.data?.data;

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredSubCategories = selectedCategory
    ? subcategories?.filter(
        (sub: TSubCategory) => sub.category._id === selectedCategory,
      )
    : [];

  console.log("----subcategories-----", subcategories);
  console.log("----selectedCategory-----", selectedCategory);
  console.log("----filteredSubCategories-----", filteredSubCategories);

  const brands = brandsList?.data?.data;

  type ProductForm = {
    title: string;
    description: string;
    mrpPrice: number;
    discountType: string;
    discount: number;
    thumbnailImage: FileList;
    backviewImage: FileList;
    images: FileList;
    category: string;
    subCategory: string;
    brand: string;
    label: string;
    freeShipping: boolean;
    inventoryType: string;
    inventories: string[];
    tags: string[];
    specifications: {
      key: string;
      value: string;
    }[];
    metaTitle: string;
    metaDescription: string;
  };

  const router = useRouter();

  const { mutate: createProductMutation, isPending } = useCreateProduct();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: {
      specifications: [
        {
          key: "",
          value: "",
        },
      ],
    },
  });

  const {
    fields: specificationFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "specifications",
  });

  const onSubmit: SubmitHandler<ProductForm> = (data) => {
    const formData = new FormData();

    /* ---------- Core ---------- */
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("mrpPrice", String(data.mrpPrice));
    formData.append("category", data.category);

    // Optional fields
    if (data.discountType) {
      formData.append("discountType", data.discountType);
    }

    if (data.subCategory) {
      formData.append("subCategory", data.subCategory);
    }

    if (data.brand) {
      formData.append("brand", data.brand);
    }

    if (data.label) {
      formData.append("label", data.label);
    }

    // Boolean
    formData.append("freeShipping", String(!!data.freeShipping));

    // Discount
    formData.append("discount", String(data.discount ?? 0));

    /* ---------- Images ---------- */
    if (data.thumbnailImage?.[0]) {
      formData.append("thumbnailImage", data.thumbnailImage[0]);
    }

    if (data.backviewImage?.[0]) {
      formData.append("backviewImage", data.backviewImage[0]);
    }

    if (data.images?.length) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    /* ---------- Inventory ---------- */
    if (data.inventoryType) {
      formData.append("inventoryType", data.inventoryType);
    }

    if (data.inventories?.length) {
      formData.append("inventories", JSON.stringify(data.inventories));
    }

    /* ---------- Specifications ---------- */
    if (data.specifications?.length) {
      formData.append("specifications", JSON.stringify(data.specifications));
    }
    if (data.tags?.length) {
      formData.append("tags", JSON.stringify(data.tags));
    }

    if (data.metaTitle) {
      formData.append("metaTitle", data.metaTitle);
    }
    if (data.metaDescription) {
      formData.append("metaDescription", data.metaDescription);
    }
    createProductMutation(formData, {
      onSuccess: (res) => {
        reset();

        toast.success(res?.message || "products created successfully");
        setTimeout(() => {
          router.push("/products");
        }, 1000);
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ??
            "Something went wrong. Please try again.",
        );
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
        <div className="bg-blue-50 p-2.5 rounded-lg">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Create Product</h2>
          <p className="text-sm text-gray-500">
            Add a new product to your inventory
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-6 space-y-8">
        {/* Basic Information Section */}
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
              required
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

        {/* Specifications Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
              Specifications
            </h3>
            <button
              type="button"
              onClick={() => append({ key: "", value: "" })}
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
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="h-10 px-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors flex items-center gap-1.5 text-sm font-medium"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
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
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
            Product Images
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <ImageUpload
                label="Front View"
                name="thumbnailImage"
                register={register}
                watch={watch}
                error={errors.thumbnailImage}
                required
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <ImageUpload
                label="Back View"
                name="backviewImage"
                watch={watch}
                register={register}
                error={errors.backviewImage}
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <MultipleImageUpload
                label="Additional Images"
                name="images"
                register={register}
                error={errors.images}
              />
            </div>
          </div>
        </div>

        {/* Pricing & Shipping Section */}
        <div className="space-y-4">
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
              required
              inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <SelectInput<ProductForm>
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

            <SelectInput<ProductForm>
              label="Free Shipping"
              name="freeShipping"
              options={shipping}
              control={control}
              error={errors.freeShipping}
              inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
            Classification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectInput<ProductForm>
              label="Category"
              name="category"
              options={categories?.map((category: TCategory) => ({
                label: category.categoryName,
                value: category._id,
              }))}
              onValueChange={(value) => {
                setSelectedCategory(value); // ✅ Update selected category
                setValue("subCategory", ""); // ✅ Clear previous subcategory
              }}
              control={control}
              error={errors.category}
              required
              inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <SelectInput<ProductForm>
              label="Sub-Category"
              name="subCategory"
              disabled={!selectedCategory}
              options={filteredSubCategories?.map(
                (subcategory: TSubCategory) => ({
                  label: subcategory.subcategoryName,
                  value: subcategory._id,
                }),
              )}
              onValueChange={(value) => {
                setSelectedCategory(value);
                
              }}
              control={control}
              error={errors.subCategory}
              inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <SelectInput<ProductForm>
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

        {/* Labels & Tags Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
            Labels & Tags
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectInput<ProductForm>
              label="Product Label"
              name="label"
              options={labels}
              control={control}
              error={errors.label}
              inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <TagInput<ProductForm>
              name="tags"
              label="Product Tags"
              setValue={setValue}
            />
          </div>
        </div>

        {/* Inventory Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
            Inventory
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <CreateInventeryType
              control={control}
              register={register}
              watch={watch}
            />
          </div>
        </div>

        {/* SEO Section */}
        <div className="space-y-4">
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
        <div className="pt-4 border-t border-gray-200">
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
                Creating Product...
              </span>
            ) : (
              "Create Product"
            )}
          </button>
          <p className="text-xs text-gray-400 mt-2">* Required fields</p>
        </div>
      </form>
    </div>
  );
};

export default CreateProducts;
