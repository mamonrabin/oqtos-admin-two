/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAllCategories } from "@/hooks/category.hook";
import { useCreateSubCategory } from "@/hooks/subCategory.hook";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import SelectInput from "@/reuseble_components/SelectInput";
import { TCategory } from "@/types";
import { Plus, Layers } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type SubCategoryFormData = {
  category: string;
  subcategoryName: string;
  image: FileList;
};



const CreateSubCategory = () => {
  const { data: categorysList } = useAllCategories();

  // const categories = categorysList?.data?.data;

  const categories =
  categorysList?.data?.data?.filter(
    (category : TCategory) => category.status === "Active"
  ) ?? [];

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<SubCategoryFormData>({
    defaultValues: {
      category: "",
      subcategoryName: "",
      image: undefined,
    },
  });

  const { mutate: createSubCategory, isPending } = useCreateSubCategory();

  const onSubmit: SubmitHandler<SubCategoryFormData> = (data) => {
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("subcategoryName", data.subcategoryName);
    formData.append("image", data.image[0]);
    createSubCategory(formData, {
      onSuccess: (res) => {
        reset({
          category: "",
          subcategoryName: "",
          image: undefined,
        });

        toast.success(res?.message || "Sub-category created successfully");
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
          <Layers size={20} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Create Sub-Category</h2>
          <p className="text-sm text-gray-500">Add a new sub-category to your store</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sub-Category Name */}
          <div className="space-y-1.5">
            <InputField
              label="Sub-Category Name"
              name="subcategoryName"
              type="text"
              placeholder="Enter sub-category name"
              register={register}
              error={errors.subcategoryName}
              required
              inputstyle="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <p className="text-xs text-gray-400">Example: Smartphones, Laptops</p>
          </div>

          {/* Category Select */}
          <div className="space-y-1.5">
            <SelectInput<SubCategoryFormData>
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
            <p className="text-xs text-gray-400">Select parent category</p>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mt-4">
          <ImageUpload
            label="Sub-Category Image"
            name="image"
            watch={watch}
            register={register}
            error={errors.image}
          />
          <p className="text-xs text-gray-400 mt-1">Upload sub-category icon or image</p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-6 mt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-400">
              <span className="text-red-500">*</span> Required fields
            </p>
          </div>
          <button
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <Plus size={18} />
                Create Sub-Category
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubCategory;