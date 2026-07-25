"use client";

import { useId, useState, useEffect } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type MultipleImageUploadProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
  maxImages?: number;
  existingImages?: string[];
};

const MultipleImageUpload = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  required = false,
  maxImages = 5,
  existingImages = [],
}: MultipleImageUploadProps<T>) => {
  const inputId = useId();

  const [previews, setPreviews] = useState<string[]>([]);
  const [existingPreviews, setExistingPreviews] = useState<string[]>([]);

  // Initialize existing images
  useEffect(() => {
    if (existingImages.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExistingPreviews(existingImages);
    }
  }, [existingImages]);

  const { ref, onChange, ...rest } = register(name, {
    required: required ? `${label} is required` : false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);

    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const selected = files.slice(0, maxImages);

    const urls = selected.map((file) => URL.createObjectURL(file));

    setPreviews(urls);
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingPreviews((prev) => prev.filter((_, i) => i !== index));
    // Note: This only removes from UI. You'll need to handle actual removal on the backend
  };

  const totalImages = existingPreviews.length + previews.length;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
        {maxImages && (
          <span className="text-xs text-gray-500 ml-2">
            ({totalImages}/{maxImages})
          </span>
        )}
      </label>

      {/* Upload Area - Only show if under max limit */}
      {totalImages < maxImages && (
        <label
          htmlFor={inputId}
          className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed hover:border-primary transition-colors"
        >
          <Upload size={26} className="text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">Click to upload images</p>
          <span className="text-xs text-gray-500">
            {maxImages - totalImages} remaining
          </span>
        </label>
      )}

      <input
        id={inputId}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        {...rest}
        ref={ref}
        onChange={handleChange}
      />

      {/* Existing Images */}
      {existingPreviews.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500">Current Images</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {existingPreviews.map((image, index) => (
              <div
                key={`existing-${index}`}
                className="relative rounded-lg overflow-hidden border group"
              >
                <Image
                  src={image}
                  alt={`Existing ${index + 1}`}
                  width={180}
                  height={180}
                  className="w-full h-36 object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1">
                  Existing
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Images Preview */}
      {previews.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-green-500">New Images</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {previews.map((image, index) => (
              <div
                key={`new-${index}`}
                className="relative rounded-lg overflow-hidden border border-green-200"
              >
                <Image
                  src={image}
                  alt={`Preview ${index + 1}`}
                  width={180}
                  height={180}
                  className="w-full h-36 object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                >
                  <X size={14} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-green-500/80 text-white text-xs text-center py-1">
                  New
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Max Limit Reached Message */}
      {totalImages >= maxImages && (
        <p className="text-xs text-amber-600">
          Maximum {maxImages} images reached
        </p>
      )}

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default MultipleImageUpload;