/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useUpdateSocial } from "@/hooks/social.hook";

import InputField from "@/reuseble_components/InputField";

import SelectInput from "@/reuseble_components/SelectInput";
import { TSocial } from "@/types";
import { SquarePen } from "lucide-react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

const socialTypes = [
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "Twitter", value: "twitter" },
  { label: "Youtube", value: "youtube" },
  { label: "Linkedin", value: "linkedin" },
  { label: "tiktok", value: "tiktok" },
  { label: "Likie", value: "likie" },
];
type EditFormData = {
  link: string;
  socialType: string;
};

interface EditSocilaProps {
  social: TSocial;
}

const EditSocila = ({ social }: EditSocilaProps) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EditFormData>();

  const { mutate, isPending } = useUpdateSocial();

  const onSubmit = (data: EditFormData) => {
    const payload: Partial<EditFormData> = {};

    if (data.link) {
      payload.link = data.link;
    }

    if (data.socialType) {
      payload.socialType = data.socialType;
    }

    mutate(
      { id: social._id, payload: payload as EditFormData },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "social updated successfully");
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

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-200">
            <SquarePen size={16} />
          </button>
        </SheetTrigger>

        <SheetContent className="!max-w-2xl p-0 overflow-y-scroll">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Edit Social Link
              </h2>
              <p className="text-sm text-gray-500">Update social information</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Current Category Preview */}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <SelectInput<EditFormData>
                label="Social Type"
                name="socialType"
                options={socialTypes}
                control={control}
                placeholder={social.type}
                error={errors.socialType}
                inputstyle="rounded lg:mt-1 !w-full !h-[40px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <InputField
                label="Social Link"
                name="link"
                type="text"
                placeholder={social.link}
                register={register}
                error={errors.link}
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
                  "Update Social"
                )}
              </button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditSocila;
