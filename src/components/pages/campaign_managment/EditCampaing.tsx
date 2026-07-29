/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BASE_URL } from "@/config";
import { useUpdateampaign } from "@/hooks/campaign.hook";
import { useAllCoupons } from "@/hooks/coupon.hook";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import SelectInput from "@/reuseble_components/SelectInput";
import { TCampaign, TCoupon } from "@/types";
import { SquarePen } from "lucide-react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditCampaingProps {
  compain: TCampaign;
}

type EditFormData = {
  _id:string;
  title: string;
  couponId: string;
  image: FileList;
};

const EditCampaing = ({ compain }: EditCampaingProps) => {
  const { data: couponList } = useAllCoupons();

  const coupons = couponList?.data;
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<EditFormData>({
    defaultValues:{
       title: compain.title|| "",
       couponId: compain.couponId?._id  || "N/A",
    }
  });

  const { mutate, isPending } = useUpdateampaign();

  const onSubmit = (data: EditFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
   if (data.couponId) {
  formData.append("couponId", data.couponId);
}

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    mutate(
      { id: compain._id, formData },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Campaing updated successfully");
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
        title: compain.title,
       couponId: compain.couponId?._id
      });
    }
  }, [open, compain, reset]);


  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-200">
            <SquarePen size={16} />
          </button>
        </SheetTrigger>

        <SheetContent className="!max-w-2xl p-0">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Edit Campaing
              </h2>
              <p className="text-sm text-gray-500">Update campaing information</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Form Fields */}
            <div className="space-y-4">
              <InputField
                label="CampaingList Title"
                name="title"
                type="text"
                placeholder={compain.title}
                register={register}
                error={errors.title}
                inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />

              <div className="space-y-4">
                {" "}
                <SelectInput<EditFormData>
                  label="Coupon"
                  name="couponId"
                  options={coupons?.map((coupon: TCoupon) => ({
                    label: coupon.code,
                    value: coupon._id,
                  }))}
                  control={control}
                  placeholder={compain.couponId.code}
                  error={errors.couponId}
                  inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ImageUpload
                  label="Image"
                  name="image"
                  existingImage={
                    compain?.image ? BASE_URL + compain.image : undefined
                  }
                  watch={watch}
                  register={register}
                  error={errors.image}
                />
              </div>
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
                  "Update Campaing"
                )}
              </button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditCampaing;
