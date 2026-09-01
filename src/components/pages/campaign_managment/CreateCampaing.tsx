/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import SelectInput from "@/reuseble_components/SelectInput";
import { useAllCoupons } from "@/hooks/coupon.hook";
import {
  TBrand,
  TCategory,
  TCoupon,
  TProduct,
  TSubCategory,
} from "@/types";
import { useCreateCampaign } from "@/hooks/campaign.hook";
import { useAllCategories } from "@/hooks/category.hook";
import { useAllSubCategories } from "@/hooks/subCategory.hook";
import { useAllBrands } from "@/hooks/brand.hook";
import { useProducts } from "@/hooks/product.hook";
import Select from "react-select";
const couponTypes = [
  { label: "Product wise", value: "product" },
  { label: "Category wise", value: "category" },
  { label: "Sub-Category wise", value: "subCategory" },
  { label: "Brand wise", value: "brand" },
];
const campaignType = [
  { label: "Flash_Sale", value: "Flash_Sale" },
  { label: "Eid_Sale", value: "Eid_Sale" },
  { label: "Black_friday", value: "Black_friday" },
  { label: "Summer_sale", value: "Summer_sale" },
];

type CampaingFormData = {
  title: string;
  couponId: string;
  couponType: string;
  campaigntype: string;
  categoryID?: string;
  subCategoryID?: string;
  brandID?: string;
  products?: string;
  image: FileList;
};

const CreateCampaing = () => {
  const { data: couponList } = useAllCoupons();

  const coupons = couponList?.data;

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<CampaingFormData>();

  const { data: productsList } = useProducts();
  const { data: categorysList } = useAllCategories();
  const { data: subCategorysList } = useAllSubCategories();
  const { data: brandList } = useAllBrands();

  const products = productsList?.data;
  const categories = categorysList?.data;
  const subCategories = subCategorysList?.data;
  const brands = brandList?.data;

  console.log("----------products-----------", products);

  const { mutate, isPending } = useCreateCampaign();

  const couponType = watch("couponType");

  const onSubmit: SubmitHandler<CampaingFormData> = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("couponId", data.couponId);
    formData.append("couponType", data.couponType);
    formData.append("campaigntype", data.campaigntype);
    if (data.brandID) {
      formData.append("brandID", data.brandID);
    }

    if (data.subCategoryID) {
      formData.append("subCategoryID", data.subCategoryID);
    }

    if (data.products?.length) {
      formData.append("products", JSON.stringify(data.products));
    }
    formData.append("image", data.image[0]);

    mutate(formData, {
      onSuccess: (res) => {
        reset();
        toast.success(res?.message || "Campaing created successfully");
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
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Create Campaing</h2>
          <p className="text-sm text-gray-500">Add a new brand to your store</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campaing Title */}

          <InputField
            label="Campaing Title"
            name="title"
            type="text"
            placeholder="Enter campaing title"
            register={register}
            error={errors.title}
            required
            inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />

          <SelectInput<CampaingFormData>
            label="Coupon"
            name="couponId"
            options={coupons?.map((coupon: TCoupon) => ({
              label: coupon.code,
              value: coupon._id,
            }))}
            control={control}
            error={errors.couponId}
            required
            inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <SelectInput<CampaingFormData>
            label="Coupon Type"
            name="couponType"
            options={couponTypes}
            control={control}
            error={errors.couponType}
            inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <SelectInput<CampaingFormData>
            label="campaignType"
            name="campaigntype"
            options={campaignType}
            control={control}
            error={errors.couponId}
            required
            inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {couponType === "product" && (
          <div className="mt-4">
            <Controller
              control={control}
              name="products"
              render={({ field }) => (
                <Select
                  isMulti
                  options={products?.map((product: TProduct) => ({
                    label: product.title,
                    value: product._id,
                  }))}
                  value={products
                    ?.filter((p: TProduct) => field.value?.includes(p._id))
                    .map((p: TProduct) => ({
                      label: p.title,
                      value: p._id,
                    }))}
                  onChange={(selected) =>
                    field.onChange(selected.map((item) => item.value))
                  }
                />
              )}
            />
          </div>
        )}
        {couponType === "category" && (
          <div className="mt-4">
            <SelectInput<CampaingFormData>
              label="Category"
              name="categoryID"
              options={categories?.map((category: TCategory) => ({
                label: category.categoryName,
                value: category._id,
              }))}
              control={control}
              error={errors.categoryID}
              required
              inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
        {couponType === "subCategory" && (
          <div className="mt-4">
            <SelectInput<CampaingFormData>
              label="Sub Category"
              name="subCategoryID"
              options={subCategories?.map((subcategory: TSubCategory) => ({
                label: subcategory.subcategoryName,
                value: subcategory._id,
              }))}
              control={control}
              error={errors.subCategoryID}
              required
              inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {couponType === "brand" && (
          <div className="mt-4">
            <SelectInput<CampaingFormData>
              label="Brand"
              name="brandID"
              options={brands?.map((brand: TBrand) => ({
                label: brand.title,
                value: brand._id,
              }))}
              control={control}
              error={errors.brandID}
              required
              inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        <div>
          <ImageUpload
            label="Banner or Image"
            name="image"
            watch={watch}
            register={register}
            error={errors.image}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between mt-8">
          <div>
            <p className="text-xs text-gray-400">
              <span className="text-red-500">*</span> Required fields
            </p>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
                Creating...
              </>
            ) : (
              <>
                <Plus size={18} />
                Create Campaing
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaing;
