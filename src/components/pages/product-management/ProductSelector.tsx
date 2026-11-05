"use client";
import SelectInput from "@/reuseble_components/SelectInput";
import { FilePlus, Filter, X, SlidersHorizontal, RotateCcw, Package } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { useAllCategories } from "@/hooks/category.hook";
import { TBrand, TCategory, TSubCategory } from "@/types";
import { useAllSubCategories } from "@/hooks/subCategory.hook";
import { useAllBrands } from "@/hooks/brand.hook";

type SubCategoryFormData = {
  title: string;
  category: string;
  subCategory: string;
  brand: string;
  date: string;
};

interface ProductProps {
  setCategory: (value?: string) => void;
  setSubCategory: (value?: string) => void;
  setBrand: (value?: string) => void;
  setDateFilter: (value?: string) => void;
}

const ProductSelector: React.FC<ProductProps> = ({
  setCategory,
  setSubCategory,
  setBrand,
  setDateFilter,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const { data: categoryList } = useAllCategories();
  const { data: subCategoryList } = useAllSubCategories();
  const { data: brandList } = useAllBrands();

  const categories = categoryList?.data;
  const subCategories = subCategoryList?.data;
  const brands = brandList?.data;

  const filteredSubCategories = selectedCategory
    ? subCategories?.filter(
        (sub: TSubCategory) => sub.category._id === selectedCategory,
      )
    : [];

  const dates = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "This Week", value: "this-week" },
    { label: "This Month", value: "this-month" },
    { label: "This Year", value: "this-year" },
  ];

  const {
    control,
    setValue,
    reset,
    watch,
  } = useForm<SubCategoryFormData>();

  const watchedValues = watch();

  const handleReset = () => {
    reset();
    setSelectedCategory("");
    setCategory(undefined);
    setSubCategory(undefined);
    setBrand(undefined);
    setDateFilter(undefined);
    setValue("subCategory", "");
    setActiveFilters([]);
  };

  const handleApply = () => {
    const filters = [];
    if (watchedValues.category) {
      const categoryName = categories?.find((c: TCategory) => c._id === watchedValues.category)?.categoryName;
      filters.push(`Category: ${categoryName || watchedValues.category}`);
    }
    if (watchedValues.subCategory) {
      const subName = filteredSubCategories?.find((s: TSubCategory) => s._id === watchedValues.subCategory)?.subcategoryName;
      filters.push(`Sub: ${subName || watchedValues.subCategory}`);
    }
    if (watchedValues.brand) {
      const brandName = brands?.find((b: TBrand) => b._id === watchedValues.brand)?.title;
      filters.push(`Brand: ${brandName || watchedValues.brand}`);
    }
    if (watchedValues.date) {
      const dateLabel = dates.find((d) => d.value === watchedValues.date)?.label;
      filters.push(`Date: ${dateLabel || watchedValues.date}`);
    }
    setActiveFilters(filters);
    setIsFilterOpen(false);
  };

  const removeFilter = (filterToRemove: string) => {
    const updatedFilters = activeFilters.filter(f => f !== filterToRemove);
    setActiveFilters(updatedFilters);
    
    if (filterToRemove.includes('Category:')) {
      setCategory(undefined);
      setValue("category", "");
      setSelectedCategory("");
    }
    if (filterToRemove.includes('Sub:')) {
      setSubCategory(undefined);
      setValue("subCategory", "");
    }
    if (filterToRemove.includes('Brand:')) {
      setBrand(undefined);
      setValue("brand", "");
    }
    if (filterToRemove.includes('Date:')) {
      setDateFilter(undefined);
      setValue("date", "");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-sm">
            <Package size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 capitalize">
              Products
            </h2>
            <p className="text-sm text-gray-500">
              Total <span className="font-semibold text-gray-700">120</span> products
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-blue-400 rounded-lg hover:bg-blue-50 transition-all duration-200 text-sm font-medium text-gray-700"
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Filters</span>
            {activeFilters.length > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </button>

          <Link href="products/create-product">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md cursor-pointer">
              <FilePlus size={16} />
              <span className="">Add Product</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-6 py-3 bg-gray-50 border-b border-gray-200">
          <span className="text-xs text-gray-500 font-medium">Active Filters:</span>
          {activeFilters.map((filter, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
            >
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition-colors ml-auto"
          >
            <RotateCcw size={12} />
            Clear All
          </button>
        </div>
      )}

      {/* Filters Section - Desktop */}
      <div className="hidden lg:flex lg:flex-wrap items-end gap-3 px-6 py-4 bg-gray-50/50">
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Category</label>
          <SelectInput<SubCategoryFormData>
            label=""
            name="category"
            control={control}
            options={categories?.map((category: TCategory) => ({
              label: category.categoryName,
              value: category._id,
            }))}
            onValueChange={(value) => {
              setSelectedCategory(value);
              setCategory(value);
              setSubCategory(undefined);
              setValue("subCategory", "");
            }}
            placeholder="All Categories"
            placeholderColor="!text-gray-500"
            inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Sub Category</label>
          <SelectInput<SubCategoryFormData>
            label=""
            name="subCategory"
            control={control}
            disabled={!selectedCategory}
            options={filteredSubCategories?.map((sub: TSubCategory) => ({
              label: sub.subcategoryName,
              value: sub._id,
            }))}
            onValueChange={(value) => {
              setSubCategory(value);
            }}
            placeholder={selectedCategory ? "All Sub Categories" : "Select Category First"}
            placeholderColor="!text-gray-500"
            inputstyle={`bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${!selectedCategory ? 'opacity-60 cursor-not-allowed' : ''}`}
          />
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Brand</label>
          <SelectInput<SubCategoryFormData>
            label=""
            name="brand"
            options={brands?.map((brand: TBrand) => ({
              label: brand.title,
              value: brand._id,
            }))}
            control={control}
            onValueChange={(value) => {
              setBrand(value);
            }}
            placeholder="All Brands"
            placeholderColor="!text-gray-500"
            inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Date</label>
          <SelectInput<SubCategoryFormData>
            label=""
            name="date"
            options={dates}
            control={control}
            onValueChange={(value) => {
              setDateFilter(value);
            }}
            placeholder="All Dates"
            placeholderColor="!text-gray-500"
            inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={handleApply}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
          >
            Apply
          </button>
          <button
            onClick={handleReset}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              </div>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Category</label>
                <SelectInput<SubCategoryFormData>
                  label=""
                  name="category"
                  control={control}
                  options={categories?.map((category: TCategory) => ({
                    label: category.categoryName,
                    value: category._id,
                  }))}
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                    setCategory(value);
                    setSubCategory(undefined);
                    setValue("subCategory", "");
                  }}
                  placeholder="All Categories"
                  placeholderColor="!text-gray-500"
                  inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Sub Category</label>
                <SelectInput<SubCategoryFormData>
                  label=""
                  name="subCategory"
                  control={control}
                  disabled={!selectedCategory}
                  options={filteredSubCategories?.map((sub: TSubCategory) => ({
                    label: sub.subcategoryName,
                    value: sub._id,
                  }))}
                  onValueChange={(value) => {
                    setSubCategory(value);
                  }}
                  placeholder={selectedCategory ? "All Sub Categories" : "Select Category First"}
                  placeholderColor="!text-gray-500"
                  inputstyle={`bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${!selectedCategory ? 'opacity-60 cursor-not-allowed' : ''}`}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Brand</label>
                <SelectInput<SubCategoryFormData>
                  label=""
                  name="brand"
                  options={brands?.map((brand: TBrand) => ({
                    label: brand.title,
                    value: brand._id,
                  }))}
                  control={control}
                  onValueChange={(value) => {
                    setBrand(value);
                  }}
                  placeholder="All Brands"
                  placeholderColor="!text-gray-500"
                  inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Date</label>
                <SelectInput<SubCategoryFormData>
                  label=""
                  name="date"
                  options={dates}
                  control={control}
                  onValueChange={(value) => {
                    setDateFilter(value);
                  }}
                  placeholder="All Dates"
                  placeholderColor="!text-gray-500"
                  inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleApply}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSelector;