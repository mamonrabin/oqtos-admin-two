/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BASE_URL } from "@/config";
import { useAllCategories } from "@/hooks/category.hook";
import { useUpdateSubCategory } from "@/hooks/subCategory.hook";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import SelectInput from "@/reuseble_components/SelectInput";
import { TCategory, TSubCategory } from "@/types";
import { SquarePen, X, Layers } from "lucide-react";
import { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditSubCategoryProps {
  subcategory: TSubCategory;
}

type EditFormData = {
  category: string;
  subcategoryName: string;
  image: FileList;
};

const EditSubCategory = ({ subcategory }: EditSubCategoryProps) => {
  const [open, setOpen] = useState(false);
  const { data: categorysList } = useAllCategories();

  const categories = categorysList?.data?.data;
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<EditFormData>({
    defaultValues: {
      category: subcategory.category?._id || "",
      subcategoryName: subcategory.subcategoryName || "N/A",
    },
  });

  const { mutate, isPending } = useUpdateSubCategory();

  const onSubmit: SubmitHandler<EditFormData> = (data) => {
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("subcategoryName", data.subcategoryName);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    mutate(
      { id: subcategory._id, formData },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Sub Category updated successfully");
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
        category: subcategory.category?._id,
        subcategoryName: subcategory.subcategoryName,
      });
    }
  }, [open, subcategory, reset]);

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-200 hover:shadow-sm">
            <SquarePen size={16} />
          </button>
        </SheetTrigger>

        <SheetContent className="!max-w-2xl p-0">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Layers size={18} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Edit Sub Category
                </h2>
                <p className="text-sm text-gray-500">
                  Update sub category information
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 space-y-6 overflow-y-auto"
          >
            {/* Current Sub Category Preview */}

            {/* Form Fields */}
            <div className="space-y-4">
              <InputField
                label="Sub Category Name"
                name="subcategoryName"
                type="text"
                placeholder={subcategory.subcategoryName}
                register={register}
                error={errors.subcategoryName}
                required
                inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />

              <SelectInput<EditFormData>
                label="Category"
                name="category"
                options={categories?.map((category: TCategory) => ({
                  label: category.categoryName,
                  value: category._id,
                }))}
                control={control}
                error={errors.category}
                required
                inputstyle="rounded-lg !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">
                Current:{" "}
                <span className="font-medium text-gray-600">
                  {subcategory?.category?.categoryName}
                </span>
              </p>

              <div>
                <ImageUpload
                  label="Sub Category Image"
                  name="image"
                  existingImage={BASE_URL + subcategory.image}
                  watch={watch}
                  register={register}
                  error={errors.image}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Leave empty to keep current image
                </p>
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
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
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
                  "Update Sub Category"
                )}
              </button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditSubCategory;
