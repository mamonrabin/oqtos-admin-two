/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUpdatePolicy } from "@/hooks/policy.hook";

import InputField from "@/reuseble_components/InputField";
import RichTextEditor from "@/reuseble_components/RichTextEditor";
import SelectInput from "@/reuseble_components/SelectInput";
import { TPolicy } from "@/types";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const policyTypes = [
  { label: "privacy", value: "privacy" },
  { label: "condition", value: "condition" },
  { label: "return", value: "return" },
  { label: "order", value: "order" },
  { label: "shipping", value: "shipping" },
];

type EditFormData = {
  title: string;
  description: string;
  type: string;
};

interface EditPolicyProps {
  policy: TPolicy;
}

const EditPolicy = ({ policy }: EditPolicyProps) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EditFormData>({
    defaultValues: {
      title: policy.title || "",
      description: policy.description || "",
      type: policy.type || "",
    },
  });

  const { mutate, isPending } = useUpdatePolicy();

  const onSubmit = (data: EditFormData) => {
    const payload: Partial<EditFormData> = {};

    if (data.title) {
      payload.title = data.title;
    }

    if (data.description) {
      payload.description = data.description;
    }
    if (data.type) {
      payload.type = data.type;
    }

    mutate(
      { id: policy._id, payload: payload as EditFormData },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "policy updated successfully");
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
        title: policy.title,
        description: policy.description,
        type: policy.type,
      });
    }
  }, [open, policy, reset]);

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
                Edit Policy
              </h2>
              <p className="text-sm text-gray-500">Update policy information</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
    

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <InputField
                label="Policy Title"
                name="title"
                type="text"
                placeholder={policy.title || "N/A"}
                register={register}
                error={errors.title}
                inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <SelectInput<EditFormData>
                label="Policy Type"
                name="type"
                options={policyTypes}
                control={control}
                placeholder={policy.type || "N/A"}
                error={errors.type}
                inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 pb-2">
                Description
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
                  "Update Policy"
                )}
              </button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditPolicy;
