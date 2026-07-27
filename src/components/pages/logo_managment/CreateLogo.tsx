/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, FolderOpen } from "lucide-react";
import { useCreateLogo } from "@/hooks/setLogo.hook";




type LogoFormData = {
  headerLogo: FileList;
  footerLogo: FileList;
  description: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
};

const CreateLogo = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<LogoFormData>();

  const { mutate, isPending } = useCreateLogo();

  const onSubmit: SubmitHandler<LogoFormData> = (data) => {
    const formData = new FormData();
    formData.append("headerLogo", data.headerLogo[0]);
    formData.append("footerLogo", data.footerLogo[0]);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("whatsapp", data.whatsapp);
    formData.append("email", data.email);

    mutate(formData, {
      onSuccess: (res) => {
        reset();
        toast.success(res?.message || "Logo created successfully");
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
          <FolderOpen size={20} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Set Logo</h2>
          <p className="text-sm text-gray-500">
            Add a new logo to your store
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
        <div className="flex flex-col gap-6">
        <div className="flex md:flex-row flex-col gap-4">
              <ImageUpload
            label="Main Logo"
            name="headerLogo"
            watch={watch}
            register={register}
            error={errors.headerLogo}
            uploaderSyle="max-w-full!"
            required
          />

          <ImageUpload
            label="Footer Logo"
            name="footerLogo"
            watch={watch}
            register={register}
            uploaderSyle="max-w-full!"
            error={errors.footerLogo}
          />
        </div>
     

          <div className="flex md:flex-row flex-col gap-4">
            <InputField
            label="Footer Description"
            name="description"
            type="text"
            placeholder="Enter Description"
            register={register}
            error={errors.description}
            inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />

          <InputField
            label="Footer Address"
            name="address"
            type="text"
            placeholder="Enter Address"
            register={register}
            error={errors.address}
            inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          </div>
         <div className="flex md:flex-row flex-col gap-4">
             <InputField
            label="Footer phone"
            name="phone"
            type="text"
            placeholder="Enter Phone"
            register={register}
            error={errors.phone}
            inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <InputField
            label="Footer Whats app"
            name="whatsapp"
            type="text"
            placeholder="Enter Number"
            register={register}
            error={errors.whatsapp}
            inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <InputField
            label="Footer Email"
            name="email"
            type="text"
            placeholder="Enter Email"
            register={register}
            error={errors.email}
            inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
         </div>

         
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-6 mt-4">
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
                Create Logo
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLogo;
