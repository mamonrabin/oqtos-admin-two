/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


import { useUpdateCoupon } from "@/hooks/coupon.hook";


import InputField from "@/reuseble_components/InputField";
import SelectInput from "@/reuseble_components/SelectInput";
import {  TCoupon } from "@/types";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";



const discountType = [
  { label: "Flat", value: "flat" },
  { label: "Percentage", value: "percentage" },
];



interface EditCouponProps {
  coupon: TCoupon;
}

type CouponUpdateFormData = {
  code: string;
  discountType: string;
  discount: number | string;
  useLimit: number;
  perUserLimit: number;
  startDate: Date | null;
  expireDate: Date | null;
  // couponType: string;
  // categoryID: string;
  // subCategoryID: string;
  // brandID: string;
};

const EditCoupon = ({ coupon }: EditCouponProps) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CouponUpdateFormData>({
    defaultValues: {
      code: coupon.code || "",
      discount: coupon.discount || "",
      discountType:
        coupon.discountType === "Percentage" ? "percentage" : "flat",
      useLimit: coupon.useLimit,
      perUserLimit: coupon.perUserLimit,
      startDate: new Date(coupon.startDate),
      expireDate: new Date(coupon.expireDate),
      // couponType: coupon.couponType,
      // categoryID: coupon.categoryID?._id,
      // subCategoryID: coupon.subCategoryID?._id,
      // brandID: coupon.brandID?._id,
    },
  });

  // const { data: categorysList } = useAllCategories();
  // const { data: subCategorysList } = useAllSubCategories();
  // const { data: brandList } = useAllBrands();

  // const categories = categorysList?.data?.data;
  // const subCategories = subCategorysList?.data?.data;
  // const brands = brandList?.data?.data;

  const { mutate, isPending } = useUpdateCoupon();
  // const couponType = watch("couponType");

  const onSubmit = (data: CouponUpdateFormData) => {
    const payload = {
      code: data.code || coupon.code,
      discount: Number(data.discount ?? coupon.discount),
      discountType:
        data.discountType === "percentage"
          ? "Percentage"
          : data.discountType === "flat"
            ? "flat"
            : coupon.discountType,
      useLimit: Number(data.useLimit ?? coupon.useLimit),
      perUserLimit: Number(data.perUserLimit ?? coupon.perUserLimit),
      startDate: data.startDate
        ? new Date(data.startDate).toISOString()
        : coupon.startDate,
      expireDate: data.expireDate
        ? new Date(data.expireDate).toISOString()
        : coupon.expireDate,
      // couponType: data.couponType || coupon.couponType,
      // categoryID: data.categoryID,
      // subCategoryID: data.subCategoryID,
      // brandID: data.brandID,
    };

    mutate(
      {
        id: coupon._id,
        payload,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Coupon updated successfully");
          reset();
          setOpen(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ??
              "Something went wrong. Please try again.",
          );
        },
      },
    );
  };

  useEffect(() => {
    if (open) {
      reset({
        code: coupon.code,
        discount: coupon.discount,
        discountType:
          coupon.discountType === "Percentage" ? "percentage" : "flat",
        useLimit: coupon.useLimit,
        perUserLimit: coupon.perUserLimit,
        startDate: new Date(coupon.startDate),
        expireDate: new Date(coupon.expireDate),
      });
    }
  }, [open, coupon, reset]);

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-200">
            <SquarePen size={16} />
          </button>
        </SheetTrigger>

        <SheetContent className="md:!max-w-4xl !w-full p-0 overflow-y-scroll">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Edit Coupon
              </h2>
              <p className="text-sm text-gray-500">Update coupon information</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Current Category Preview */}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Coupon Code"
                name="code"
                type="text"
                placeholder={coupon.code}
                register={register}
                error={errors.code}
                inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />

              <SelectInput<CouponUpdateFormData>
                label="Discount Type"
                name="discountType"
                options={discountType}
                control={control}
                placeholder={coupon.discountType}
                error={errors.discountType}
                inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <InputField
                label="Discount"
                name="discount"
                type="number"
                placeholder={String(coupon.discount)}
                register={register}
                error={errors.discount}
                inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <InputField
                label="Use Limit"
                name="useLimit"
                type="number"
                //  placeholder={coupon.useLimit}
                placeholder={String(coupon.useLimit)}
                register={register}
                error={errors.useLimit}
                inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <InputField
                label="Per User Limit"
                name="perUserLimit"
                type="number"
                //  placeholder={coupon.perUserLimit}
                placeholder={String(coupon.perUserLimit)}
                register={register}
                error={errors.perUserLimit}
                //
                inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <InputField
                label={new Date(coupon.startDate).toLocaleDateString("en-US")}
                name="startDate"
                type="date"
                placeholder=""
                register={register}
                error={errors.startDate}
                inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <InputField
                label={new Date(coupon.expireDate).toLocaleDateString("en-US")}
                name="expireDate"
                type="date"
                placeholder=""
                register={register}
                error={errors.expireDate}
                inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />

             
            </div>

   

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={isPending}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
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
                    Updating...
                  </span>
                ) : (
                  "Update Coupon"
                )}
              </button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditCoupon;
