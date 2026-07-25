/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { KeyboardEvent, useState, useEffect } from "react";
import { UseFormSetValue, FieldValues, Path } from "react-hook-form";
import { X } from "lucide-react";

type TagInputProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  defaultTags?: string[];
};

export default function TagInput<T extends FieldValues>({
  label = "Tags",
  name,
  setValue,
  defaultTags = [],
}: TagInputProps<T>) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Initialize with defaultTags
  useEffect(() => {
    if (defaultTags.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTags(defaultTags);
      setValue(name, defaultTags as unknown as T[typeof name], {
        shouldValidate: true,
      });
    }
  }, [defaultTags, name, setValue]);

  const addTag = () => {
    const value = input.trim();

    if (!value) return;
    if (tags.includes(value)) {
      setInput("");
      return;
    }

    const updatedTags = [...tags, value];

    setTags(updatedTags);
    setValue(name, updatedTags as unknown as T[typeof name], {
      shouldValidate: true,
    });

    setInput("");
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);

    setTags(updatedTags);
    setValue(name, updatedTags as unknown as T[typeof name], {
      shouldValidate: true,
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-medium text-sm">
        {label}
        <span className="text-xs text-gray-500 ml-2">
          ({tags.length} tags)
        </span>
      </label>

      <div className="border rounded-lg p-2 min-h-[42px] flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {tag}

            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "Type tag and press Enter" : "Add more tags..."}
          className="flex-1 min-w-40 outline-none bg-transparent text-sm"
        />
      </div>

      {tags.length === 0 && (
        <p className="text-xs text-gray-400">No tags added yet</p>
      )}
    </div>
  );
}