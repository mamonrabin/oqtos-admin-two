/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputField from "@/reuseble_components/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, FolderOpen } from "lucide-react";
import { useCreateTheme } from "@/hooks/theme.hook";

type ThemeFormData = {
  primary: string;
  secondary: string;
  font: string;
};

const CustomeColorDesign = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ThemeFormData>();

  const { mutate, isPending } = useCreateTheme();

  //   const onSubmit: SubmitHandler<ThemeFormData> = (data) => {
  //     const formData = new FormData();
  //     formData.append("primary", data.primary);
  //     formData.append("secondary", data.secondary);
  //     formData.append("font", data.font);

  //     mutate(formData, {
  //       onSuccess: (res) => {
  //         reset();
  //         toast.success(res?.message || "Category created successfully");
  //       },
  //       onError: (error: any) => {
  //         toast.error(
  //           error?.response?.data?.message ??
  //             "Something went wrong. Please try again.",
  //         );
  //       },
  //     });
  //   };

  const onSubmit: SubmitHandler<ThemeFormData> = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        reset();
        toast.success(res?.message || "Theme created successfully");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
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
          <FolderOpen size={20} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Create Custom Color
          </h2>
          <p className="text-sm text-gray-500">
            Add a new custom color to your store
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary */}
          <div className="space-y-1.5">
            <InputField
              label="Primary Color Code"
              name="primary"
              type="text"
              placeholder="Enter color code"
              register={register}
              error={errors.primary}
              required
              inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Secondary */}
          <div className="space-y-1.5">
            <InputField
              label="Secondary Color Code"
              name="secondary"
              type="text"
              placeholder="Enter color code"
              register={register}
              error={errors.secondary}
              required
              inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="space-y-1.5">
            <InputField
              label="Your Font Code"
              name="font"
              type="text"
              placeholder="Enter font code"
              register={register}
              inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-6 mt-4 border-t border-gray-200">
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
                Create Color
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomeColorDesign;
