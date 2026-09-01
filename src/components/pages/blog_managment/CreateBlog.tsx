/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateBlog } from "@/hooks/blog.hook";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import MultipleImageUpload from "@/reuseble_components/MultipleImageUpload";
import RichTextEditor from "@/reuseble_components/RichTextEditor";
import TagInput from "@/reuseble_components/TagInput";
import { Layers, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type blogForm = {
  title: string;
  cardDescription: string;
  content: string;
  image: FileList;
  images: FileList;
  tags: string[];
};

const CreateBlog = () => {


  const router = useRouter();


  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<blogForm>({
    defaultValues: {
      title: "",
      cardDescription: "",
      content: "",
      image: undefined,
      images: undefined,
      tags: [],
    },
  });

  const { mutate: createBlog, isPending } = useCreateBlog();

  const onSubmit: SubmitHandler<blogForm> = (data) => {
  const formData = new FormData();

  if (data.title) {
    formData.append("title", data.title);
  }

  if (data.cardDescription) {
    formData.append("cardDescription", data.cardDescription);
  }

  if (data.content) {
    formData.append("content", data.content);
  }

  if (data.tags?.length) {
    formData.append("tags", JSON.stringify(data.tags));
  }

  // Single image
  if (data.image?.length) {
    formData.append("image", data.image[0]);
  }

  // Multiple images
  if (data.images?.length) {
    Array.from(data.images).forEach((file) => {
      formData.append("images", file);
    });
  }

  createBlog(formData, {
    onSuccess: (res) => {
      reset({
        title: "",
        cardDescription: "",
        content: "",
        image: undefined,
        images: undefined,
        tags: [],
      });

      toast.success(
        res?.message || "Blog created successfully"
      );
       setTimeout(() => {
          router.push("/blog");
        }, 1000);
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
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
          <h2 className="text-xl font-bold text-gray-900">Create Blog</h2>
          <p className="text-sm text-gray-500">Add a new blog to your store</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <InputField
            label="Blog Title"
            name="title"
            type="text"
            placeholder="Enter Blog Title"
            register={register}
            error={errors.title}
            inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <TagInput<blogForm>
            name="tags"
            label="Blog Tags"
            setValue={setValue}
          />
        </div>

        <div>
          <InputField
            label="Card Description"
            name="cardDescription"
            type="text"
            placeholder="Enter Description"
            register={register}
            error={errors.cardDescription}
            inputstyle="rounded !w-full !h-[42px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex md:flex-row flex-col gap-6 w-full mt-4">
          <ImageUpload
            label="Front View"
            name="image"
            register={register}
            watch={watch}
            error={errors.image}
            required
          />

          <MultipleImageUpload
            label="Additional Images"
            name="images"
            register={register}
            error={errors.images}
          />
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 pb-2">
            Blog Content <span className="text-red-500">*</span>
          </p>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
          />
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
                Create Blog
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
