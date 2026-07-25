/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputField from "@/reuseble_components/InputField";
import {SubmitHandler, useForm } from "react-hook-form";

import { Plus } from "lucide-react";
import SelectInput from "@/reuseble_components/SelectInput";
import { toast } from "sonner";


import { useCreateSocial } from "@/hooks/social.hook";

const socialTypes = [
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "Twitter", value: "twitter" },
  { label: "Youtube", value: "youtube" },
  { label: "Linkedin", value: "linkedin" },
  { label: "tiktok", value: "tiktok" },
  { label: "Likie", value: "likie" },
];

type socialFormData = {
  link: string;
  socialType: string;
};

const CreateSocial = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<socialFormData>();

  const { mutate, isPending } = useCreateSocial();

  const onSubmit: SubmitHandler<socialFormData> = (data) => {
    const payload = {
      link: data.link,
      socialType: data.socialType,
     
    };
    mutate(payload, {
      onSuccess: (res) => {
        reset();
        toast.success(res?.message || "socila link created successfully");
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
          <h2 className="text-xl font-bold text-gray-900">Create Socila Link</h2>
          <p className="text-sm text-gray-500">
            Add a new link to your store
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
        <div className="grid md:grid-cols-2 md:gap-4 gap-2">
            <SelectInput<socialFormData>
            label="Social Type"
            name="socialType"
            options={socialTypes}
            control={control}
            error={errors.socialType}
            required
            inputstyle="rounded lg:mt-1 !w-full !h-[40px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <InputField
            label="Social Link"
            name="link"
            type="text"
            placeholder="Copy and Enter link"
            register={register}
            error={errors.link}
            required
            inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />

          
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-6 mt-2 ">
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
                Create Social
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSocial;
