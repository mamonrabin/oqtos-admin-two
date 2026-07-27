/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BASE_URL } from "@/config";
import { useUpdateBanner } from "@/hooks/banner.hook";
import { useAllCategories} from "@/hooks/category.hook";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import SelectInput from "@/reuseble_components/SelectInput";
import { TBanner, TCategory } from "@/types";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

const BannerType = [
  { label: "Main", value: "Main" },
  { label: "Offer", value: "Offer" },
  { label: "Promotion", value: "Promotion" },
];

type EditFormData = {
  title: string;
  description: string;
  category: string;
  link: string;
  type: string;
  image: FileList;
};

interface EditBannerProps {
  banner: TBanner;
}

const EditBanner = ({ banner }: EditBannerProps) => {
  const { data: categorysList } = useAllCategories();

  const categories = categorysList?.data?.data;

  const [open, setOpen] = useState(false);
const {
  register,
  handleSubmit,
  reset,
  watch,
  control,
  formState: { errors },
} = useForm<EditFormData>({
  defaultValues: {
    title: banner.title,
    description: banner.description,
    category: banner.category?._id,
    link: banner.link,
    type: banner.type,
  },
});

  const { mutate, isPending } = useUpdateBanner();

  const onSubmit = (data: EditFormData) => {
  const formData = new FormData();

  if (data.title !== banner.title) {
    formData.append("title", data.title);
  }

  if (data.description !== banner.description) {
    formData.append("description", data.description);
  }

  if (data.category !== banner.category?._id) {
    formData.append("category", data.category);
  }

  if (data.type !== banner.type) {
    formData.append("type", data.type);
  }

  if (data.link !== banner.link) {
    formData.append("link", data.link);
  }

  if (data.image?.length) {
    formData.append("image", data.image[0]);
  }

  mutate(
    {
      id: banner._id,
      formData,
    },
    {
      onSuccess: (res) => {
        toast.success(res?.message || "Banner updated successfully");
        reset();
        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      },
    }
  );
};

useEffect(() => {
  if (open) {
    reset({
      title: banner.title,
      description: banner.description,
      category: banner.category?._id,
      link: banner.link,
      type: banner.type,
    });
  }
}, [open, banner, reset]);

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
                Edit Banner
              </h2>
              <p className="text-sm text-gray-500">Update banner information</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Current Category Preview */}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <InputField
                label="Banner Title"
                name="title"
                type="text"
                placeholder={banner.title || "N/A"}
                register={register}
                error={errors.title}
                inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <SelectInput<EditFormData>
                label="Banner Type"
                name="type"
                options={BannerType}
                control={control}
                placeholder={banner.type || "N/A"}
                error={errors.type}
                inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              {/* Category Select */}

              <SelectInput<EditFormData>
                label="Category"
                name="category"
                options={categories?.map((category: TCategory) => ({
                  label: category.categoryName,
                  value: category._id,
                }))}
                control={control}
                placeholder={banner.category?.categoryName || "N/A"}
                error={errors.category}
                inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <InputField
                label="Banner Link"
                name="link"
                type="text"
                placeholder={banner.link || "N/A"}
                register={register}
                error={errors.link}
                inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex md:flex-row flex-col items-center gap-2 w-full mt-4">
              <ImageUpload
                label="Banner Image"
                name="image"
                watch={watch}
                 existingImage={BASE_URL + banner.image || "N/A"}
                register={register}
                error={errors.image}
              />

              <div className="w-full flex flex-col gap-1">
                <label className="text-sm font-medium">
                  Banner Description
                </label>
                <textarea
                  className="px-4 py-2 w-full border outline-none text-sm rounded-lg"
                  {...register("description")}
                  cols={10}
                  rows={6}
                  placeholder={banner.description || "N/A"}
                ></textarea>
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
                  "Update Banner"
                )}
              </button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditBanner;
