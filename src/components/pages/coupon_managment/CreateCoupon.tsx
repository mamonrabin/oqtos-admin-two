/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputField from "@/reuseble_components/InputField";
import { SubmitHandler, useForm } from "react-hook-form";

import { Plus } from "lucide-react";
import SelectInput from "@/reuseble_components/SelectInput";
// import { useAllCategories } from "@/hooks/category.hook";
// import { TBrand, TCategory, TSubCategory } from "@/types";
// import { useAllSubCategories } from "@/hooks/subCategory.hook";
// import { useAllBrands } from "@/hooks/brand.hook";
import { useCreateCoupon } from "@/hooks/coupon.hook";
import { toast } from "sonner";

const discountType = [
  { label: "Flat", value: "flat" },
  { label: "Percentage", value: "percentage" },
];

const couponTypes = [
  { label: "Category wise", value: "category" },
  { label: "Sub-Category wise", value: "subCategory" },
  { label: "Brand wise", value: "brand" },
];

type CouponFormData = {
  code: string;
  discountType: string;
  discount: number;
  useLimit: number;
  perUserLimit: number;
  startDate: Date | null;
  expireDate: Date | null;
};

const CreateCoupon = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<CouponFormData>();

  const { mutate, isPending } = useCreateCoupon();

  // const { data: categorysList } = useAllCategories();
  // const { data: subCategorysList } = useAllSubCategories();
  // const { data: brandList } = useAllBrands();

  // const categories = categorysList?.data?.data;
  // const subCategories = subCategorysList?.data?.data;
  // const brands = brandList?.data?.data;



  const onSubmit: SubmitHandler<CouponFormData> = (data) => {
    const payload = {
        code: data.code,
        discount: data.discount,
        discountType:
          data.discountType === "percentage" ? "Percentage" : "flat",
        useLimit: data.useLimit,
        perUserLimit: data.perUserLimit,
        startDate: data.startDate ? new Date(data.startDate).toISOString() : "",
        expireDate: data.expireDate ? new Date(data.expireDate).toISOString() : "",
        // couponType: data.couponType,
        // categoryID: data.categoryID || undefined,
        // subCategoryID: data.subCategoryID || undefined,
        // brandID: data.brandID || undefined,
      };
    mutate(payload, {
      onSuccess: (res) => {
        reset();
        toast.success(res?.message || "Coupon created successfully");
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
        <div className="bg-blue-50 p-2.5 rounded">
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
          <h2 className="text-xl font-bold text-gray-900">Create Coupon</h2>
          <p className="text-sm text-gray-500">
            Add a new coupon to your store
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4">
          <InputField
            label="Coupon Code"
            name="code"
            type="text"
            placeholder="Enter Coupon Code"
            register={register}
            error={errors.code}
            required
            inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />

          <SelectInput<CouponFormData>
            label="Discount Type"
            name="discountType"
            options={discountType}
            control={control}
            error={errors.discountType}
            required
            inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <InputField
            label="Discount"
            name="discount"
            type="number"
            placeholder="Enter Discount"
            register={register}
            error={errors.discount}
            required
            inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <InputField
            label="Use Limit"
            name="useLimit"
            type="number"
            placeholder="Use Limit"
            register={register}
            error={errors.useLimit}
            required
            inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <InputField
            label="Per User Limit"
            name="perUserLimit"
            type="number"
            placeholder="Per User Limit"
            register={register}
            error={errors.perUserLimit}
            // required
            inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <InputField
            label="Start Date"
            name="startDate"
            type="date"
            placeholder=""
            register={register}
            error={errors.startDate}
            required
            inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <InputField
            label="Expire Date"
            name="expireDate"
            type="date"
            placeholder=""
            register={register}
            error={errors.expireDate}
            required
            inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          </div>

          {/* <SelectInput<CouponFormData>
            label="Coupon Type"
            name="couponType"
            options={couponTypes}
            control={control}
            error={errors.couponType}
            inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div> */}

        {/* {couponType === "category" && (
          <div className="mt-4">
            <SelectInput<CouponFormData>
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
        )} */}
        {/* {couponType === "subCategory" && (
          <div className="mt-4">
            <SelectInput<CouponFormData>
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
        )} */}

        {/* {couponType === "brand" && (
          <div className="mt-4">
            <SelectInput<CouponFormData>
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
        )} */}

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-6 mt-2 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-400">
              <span className="text-red-500">*</span> Required fields
            </p>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
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
                Create Coupon
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCoupon;
