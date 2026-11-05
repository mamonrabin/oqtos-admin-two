"use client";
import SelectInput from "@/reuseble_components/SelectInput";
import { Filter, X, SlidersHorizontal, RotateCcw } from "lucide-react";

import { useForm } from "react-hook-form";

import { useState } from "react";
import { TMeta } from "@/types";

type FormData = {
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  brand: string;
  date: string;
};

interface ProductProps {
  setPaymentMethod: (value?: string) => void;
  setPaymentStatus: (value?: string) => void;
  setStatus: (value?: string) => void;
  setDateFilter: (value?: string) => void;
   meta: TMeta;
}

const OrderSelector: React.FC<ProductProps> = ({
  setPaymentMethod,
  setPaymentStatus,
  setStatus,
  setDateFilter,
  meta
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const statues = [
    { label: "PENDING", value: "PENDING" },
    { label: "CONFIRMED", value: "CONFIRMED" },
    { label: "PROCESSING", value: "PROCESSING" },
    { label: "SHIPPED", value: "SHIPPED" },
    { label: "DELIVERED", value: "DELIVERED" },
    { label: "CANCELLED", value: "CANCELLED" },
    { label: "ON_HOLD", value: "ON_HOLD" },
    { label: "IN_REVIEW", value: "IN_REVIEW" },
    { label: "RETURNED", value: "RETURNED" },
  ];
  const paymentMethods = [
    { label: "COD", value: "COD" },
    { label: "CARD", value: "CARD" },
    { label: "BKASH", value: "BKASH" },
    { label: "NAGAD", value: "NAGAD" },
  ];
  const paymentStatus = [
    { label: "UNPAID", value: "UNPAID" },
    { label: "PAID", value: "PAID" },
    { label: "FAILED", value: "FAILED" },
    { label: "REFUNDED", value: "REFUNDED" },
  ];
  const dates = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "This Week", value: "this-week" },
    { label: "This Month", value: "this-month" },
    { label: "This Year", value: "this-year" },
  ];

  const {
    control,
    reset,
    watch,
  } = useForm<FormData>();

  const watchedValues = watch();

  const handleReset = () => {
    reset();
    setStatus("");
    setPaymentStatus(undefined);
    setPaymentMethod(undefined);
    setDateFilter(undefined);
    setActiveFilters([]);
  };

  const handleApply = () => {
    const filters = [];
    if (watchedValues.status) filters.push(`Status: ${watchedValues.status}`);
    if (watchedValues.paymentMethod) filters.push(`Payment: ${watchedValues.paymentMethod}`);
    if (watchedValues.paymentStatus) filters.push(`Payment Status: ${watchedValues.paymentStatus}`);
    if (watchedValues.date) filters.push(`Date: ${watchedValues.date}`);
    setActiveFilters(filters);
    setIsFilterOpen(false);
  };

  const removeFilter = (filterToRemove: string) => {
    const updatedFilters = activeFilters.filter(f => f !== filterToRemove);
    setActiveFilters(updatedFilters);
    
    // Reset corresponding filter
    if (filterToRemove.includes('Status:')) setStatus("");
    if (filterToRemove.includes('Payment:')) setPaymentMethod(undefined);
    if (filterToRemove.includes('Payment Status:')) setPaymentStatus(undefined);
    if (filterToRemove.includes('Date:')) setDateFilter(undefined);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-row sm:items-center justify-between gap-4 p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-sm">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 capitalize">
              Orders
            </h2>
            <p className="text-sm text-gray-500">
              Total <span className="font-semibold text-gray-700"> {meta?.total || 0}</span> orders
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
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Status</label>
          <SelectInput<FormData>
            label=""
            name="status"
            options={statues}
            control={control}
            onValueChange={(value) => {
              setStatus(value);
            }}
            placeholder="All Status"
            placeholderColor="!text-gray-500"
            inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Payment Method</label>
          <SelectInput<FormData>
            label=""
            name="paymentMethod"
            options={paymentMethods}
            control={control}
            onValueChange={(value) => {
              setPaymentMethod(value);
            }}
            placeholder="All Methods"
            placeholderColor="!text-gray-500"
            inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Payment Status</label>
          <SelectInput<FormData>
            label=""
            name="paymentStatus"
            options={paymentStatus}
            control={control}
            onValueChange={(value) => {
              setPaymentStatus(value);
            }}
            placeholder="All Status"
            placeholderColor="!text-gray-500"
            inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Date</label>
          <SelectInput<FormData>
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
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Status</label>
                <SelectInput<FormData>
                  label=""
                  name="status"
                  options={statues}
                  control={control}
                  onValueChange={(value) => {
                    setStatus(value);
                  }}
                  placeholder="All Status"
                  placeholderColor="!text-gray-500"
                  inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Payment Method</label>
                <SelectInput<FormData>
                  label=""
                  name="paymentMethod"
                  options={paymentMethods}
                  control={control}
                  onValueChange={(value) => {
                    setPaymentMethod(value);
                  }}
                  placeholder="All Methods"
                  placeholderColor="!text-gray-500"
                  inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Payment Status</label>
                <SelectInput<FormData>
                  label=""
                  name="paymentStatus"
                  options={paymentStatus}
                  control={control}
                  onValueChange={(value) => {
                    setPaymentStatus(value);
                  }}
                  placeholder="All Status"
                  placeholderColor="!text-gray-500"
                  inputstyle="bg-white w-full text-gray-700 border border-gray-300 rounded-lg !h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Date</label>
                <SelectInput<FormData>
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

export default OrderSelector;