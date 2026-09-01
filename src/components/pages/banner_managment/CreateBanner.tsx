/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateBanner } from "@/hooks/banner.hook";
import { useAllCategories } from "@/hooks/category.hook";


import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import SelectInput from "@/reuseble_components/SelectInput";
import { TCategory } from "@/types";
import { Plus, Layers } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const BannerType = [
  { label: "Main", value: "Main" },
  { label: "Offer", value: "Offer" },
  { label: "Promotion", value: "Promotion" },
];

type BannerFormData = {
  title: string;
  description: string;
  category: string;
  link: string;
  type: string;
  image: FileList;
};

const CreateBanner = () => {
  const { data: categorysList } = useAllCategories();

  const categories = categorysList?.data;

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<BannerFormData>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      link: "",
      type: "",
      image: undefined,
    },
  });

  const { mutate: createBanner, isPending } = useCreateBanner();

  const onSubmit: SubmitHandler<BannerFormData> = (data) => {
    const formData = new FormData();

    if (data.title) {
      formData.append("title", data.title);
    }
    if (data.description) {
      formData.append("description", data.description);
    }

    if (data.category) {
      formData.append("category", data.category);
    }

    if (data.type) {
      formData.append("type", data.type);
    }

    if (data.link) {
      formData.append("link", data.link);
    }
    // formData.append("type", data.type);
    formData.append("image", data.image[0]);
    createBanner(formData, {
      onSuccess: (res) => {
        reset({
          title: "",
          description: "",
          category: "",
          link: "",
          type: "",
          image: undefined,
        });

        toast.success(res?.message || "banner created successfully");
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
          <h2 className="text-xl font-bold text-gray-900">Create Banner</h2>
          <p className="text-sm text-gray-500">
            Add a new Banner to your store
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <InputField
            label="Banner Title"
            name="title"
            type="text"
            placeholder="Enter Banner Title"
            register={register}
            error={errors.title}
            inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <SelectInput<BannerFormData>
            label="Banner Type"
            name="type"
            options={BannerType}
            control={control}
            placeholder="Select Type"
            error={errors.type}
            inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Category Select */}

          <SelectInput<BannerFormData>
            label="Category"
            name="category"
            options={categories?.map((category: TCategory) => ({
              label: category.categoryName,
              value: category._id,
            }))}
            control={control}
            error={errors.category}
            inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <InputField
            label="Banner Link"
            name="link"
            type="text"
            placeholder="Enter Link"
            register={register}
            error={errors.link}
            inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Image Upload */}
        <div className="flex md:flex-row flex-col items-center gap-2 w-full mt-4">
          <ImageUpload
            label="Banner Image"
            name="image"
            watch={watch}
            register={register}
            error={errors.image}
            required
          />

          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-medium">Banner Description</label>
            <textarea
              className="px-4 py-2 w-full border outline-none text-sm rounded-lg"
              {...register("description")}
              cols={10}
              rows={6}
              placeholder="Enter banner description"
            ></textarea>
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
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
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
                Create Banner
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBanner;
