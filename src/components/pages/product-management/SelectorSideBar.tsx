"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SelectInput from "@/reuseble_components/SelectInput";
import { PanelLeftOpen } from "lucide-react";
type SubCategoryFormData = {
  title: string;
  category: string;
  image: FileList;
};

import { SubmitHandler, useForm } from "react-hook-form";

const SelectorSideBar = () => {
  const categories = [
    { label: "Electronics", value: "electronics" },
    { label: "Fashion", value: "fashion" },
    { label: "Books", value: "books" },
  ];

  const {
   
    control,
   
    reset,
    formState: { errors },
  } = useForm<SubCategoryFormData>();

  const onSubmit: SubmitHandler<SubCategoryFormData> = (data) => {
    
    reset();
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger className="px-2  py-2 md:hidden flex rounded bg-primary hover:bg-primary/80 duration-300 text-secondary text-sm cursor-pointer">
          
            <PanelLeftOpen size={16} />
          
        </SheetTrigger>
        <SheetContent className="p-8">
          <h2 className="md:text-lg text-base font-medium capitalize">
            Filter Products
          </h2>

          <div className="">
            <SelectInput<SubCategoryFormData>
              label=""
              name="category"
              options={categories}
              control={control}
              error={errors.category}
              // required
              placeholder="Select Category"
              placeholderColor="!text-white"
              inputstyle="bg-primary w-full text-secondary outline-none border-transparent rounded !h-10 outline-none"
            />
            <SelectInput<SubCategoryFormData>
              label=""
              name="category"
              options={categories}
              control={control}
              error={errors.category}
              // required
              placeholder="Select Sub Category"
              placeholderColor="!text-white"
              inputstyle="bg-primary w-full text-secondary outline-none border-transparent rounded !h-10 outline-none"
            />
            <SelectInput<SubCategoryFormData>
              label=""
              name="category"
              options={categories}
              control={control}
              error={errors.category}
              // required
              placeholder="Select Brand"
              placeholderColor="!text-white"
              inputstyle="bg-primary w-full text-secondary outline-none border-transparent rounded !h-10 outline-none"
            />
            <SelectInput<SubCategoryFormData>
              label=""
              name="category"
              options={categories}
              control={control}
              error={errors.category}
              // required
              placeholder="Today"
              placeholderColor="!text-white"
              inputstyle="bg-primary w-full text-secondary outline-none border-transparent rounded !h-10 outline-none"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SelectorSideBar;
