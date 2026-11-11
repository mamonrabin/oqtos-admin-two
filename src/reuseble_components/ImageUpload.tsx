/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type ImageUploadProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  watch?: UseFormWatch<T>;
  error?: FieldError;
  required?: boolean;
  existingImage?: string;
  uploaderSyle?:string
};

const ImageUpload = <T extends FieldValues>({
  label,
  name,
  register,
  watch,
  error,
  required = false,
  existingImage,
  uploaderSyle
}: ImageUploadProps<T>) => {
  const inputId = useId();

  const [preview, setPreview] = useState(existingImage || "");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const file = watch?.(name);

  useEffect(() => {
    if (file && file.length > 0) {
      const objectUrl = URL.createObjectURL(file[0]);

      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    setPreview(existingImage || "");

    // Clear the file input after form reset
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [file, existingImage]);

  const { ref, onChange, ...rest } = register(name, {
    required: required ? `${label} is required` : false,
  });

  return (
    <div className={`flex w-full max-w-xs flex-col gap-2 ${uploaderSyle}`}>
      <label className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {preview ? (
        <div className="relative">
          <Image
            src={preview}
            alt="Preview"
            width={300}
            height={160}
            className="h-40 w-full rounded-xl object-cover"
            
          />

          <button
            type="button"
            onClick={() => {
              setPreview("");

              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white"
          >
            <X size={16} />
          </button>

          <label
            htmlFor={inputId}
            className="absolute bottom-2 right-2 cursor-pointer rounded bg-black/70 px-3 py-1 text-sm text-white"
          >
            Change
          </label>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed hover:border-primary"
        >
          <Upload size={24} />
          <p className="mt-2 text-sm text-gray-500">
            Click to upload image
          </p>
        </label>
      )}

      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        {...rest}
        ref={(element) => {
          ref(element);
          fileInputRef.current = element;
        }}
        onChange={(e) => {
          onChange(e);

          const selectedFile = e.target.files?.[0];

          if (!selectedFile) return;

          const objectUrl = URL.createObjectURL(selectedFile);

          setPreview((prev) => {
            if (prev.startsWith("blob:")) {
              URL.revokeObjectURL(prev);
            }
            return objectUrl;
          });
        }}
      />

      {error && (
        <p className="text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default ImageUpload;