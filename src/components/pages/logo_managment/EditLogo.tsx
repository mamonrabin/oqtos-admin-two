/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useUpdateLogo } from "@/hooks/setLogo.hook";
import ImageUpload from "@/reuseble_components/ImageUpload";
import InputField from "@/reuseble_components/InputField";
import SelectInput from "@/reuseble_components/SelectInput";
import { TLogo } from "@/types";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditFormData = {
  headerLogo: FileList;
  footerLogo: FileList;
  description: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
};

interface EditLogoProps {
  logo: TLogo;
}

const EditLogo = ({ logo }: EditLogoProps) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EditFormData>({
    defaultValues: {
      description: logo.description || "",
      address: logo.address || "",
      phone: logo.phone || "",
      whatsapp: logo.whatsapp || "",
      email: logo.email || "",
    },
  });

  const { mutate, isPending } = useUpdateLogo();

  const onSubmit = (data: EditFormData) => {
    const formData = new FormData();
    if (data.headerLogo?.[0]) {
      formData.append("headerLogo", data.headerLogo[0]);
    }

    if (data.footerLogo?.[0]) {
      formData.append("footerLogo", data.footerLogo[0]);
    }
    if (data.description) {
      formData.append("description", data.description);
    }
    if (data.address) {
      formData.append("address", data.address);
    }
    if (data.phone) {
      formData.append("phone", data.phone);
    }
    if (data.email) {
      formData.append("email", data.email);
    }
    if (data.whatsapp) {
      formData.append("whatsapp", data.whatsapp);
    }

    mutate(
      { id: logo._id, formData },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Logo updated successfully");
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
        description: logo.description,
        address: logo.address,
        phone: logo.phone,
        whatsapp: logo.whatsapp,
        email: logo.email,
      });
    }
  }, [open, logo, reset]);

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
              <h2 className="text-lg font-semibold text-gray-900">Edit Logo</h2>
              <p className="text-sm text-gray-500">Update logo information</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Current Category Preview */}

            <div className="flex flex-col gap-6">
              <div className="flex md:flex-row flex-col gap-4">
                <ImageUpload
                  label="Main Logo"
                  name="headerLogo"
                  watch={watch}
                  register={register}
                  error={errors.headerLogo}
                  existingImage={logo.headerLogo}
                  uploaderSyle="max-w-full!"
                />
                <ImageUpload
                  label="Footer Logo"
                  name="footerLogo"
                  watch={watch}
                  register={register}
                  existingImage={
                    logo.footerLogo ? logo.footerLogo : undefined
                  }
                  uploaderSyle="max-w-full!"
                  error={errors.footerLogo}
                />
              </div>

              <div className="flex md:flex-row flex-col gap-4">
                <InputField
                  label="Footer Description"
                  name="description"
                  type="text"
                  placeholder={logo.description}
                  register={register}
                  error={errors.description}
                  inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />

                <InputField
                  label="Footer Address"
                  name="address"
                  type="text"
                  placeholder={logo.address}
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
                  placeholder={logo.phone}
                  register={register}
                  error={errors.phone}
                  inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <InputField
                  label="Footer Whats app"
                  name="whatsapp"
                  type="text"
                  placeholder={logo.whatsapp}
                  register={register}
                  error={errors.whatsapp}
                  inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <InputField
                  label="Footer Email"
                  name="email"
                  type="text"
                  placeholder={logo.email}
                  register={register}
                  error={errors.email}
                  inputstyle="w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
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
                  "Update Logo"
                )}
              </button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditLogo;
