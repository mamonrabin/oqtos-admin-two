
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import RichTextEditor from "@/reuseble_components/RichTextEditor";
import { useCreateAbout } from "@/hooks/about.hook";


type AboutFormData = {

  description: string;
 
};

const CreateAbout = () => {
  const {
    handleSubmit,
    control,
    reset,
  } = useForm<AboutFormData>();

  const { mutate, isPending } = useCreateAbout();

  const onSubmit: SubmitHandler<AboutFormData> = (data) => {
    const payload = {
      description: data.description,
      
     
    };
    mutate(payload, {
      onSuccess: (res) => {
        reset();
        toast.success(res?.message || "policy created successfully");
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
          <h2 className="text-xl font-bold text-gray-900">Create About</h2>
          <p className="text-sm text-gray-500">
            Add a new about to your store
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
        

          

        <div className="mt-4 flex flex-col gap-4">
          <p className="text-sm font-medium text-gray-700 pb-2">
            Description <span className="text-red-500">*</span>
          </p>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
          />

        </div>

         

        

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
                Create About
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAbout;
