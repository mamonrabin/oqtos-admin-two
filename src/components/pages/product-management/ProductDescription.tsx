/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { TProduct } from "@/types";
import { Ellipsis, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import Barcode from "react-barcode";
interface productDescriptionProps {
  product: TProduct;
}

const ProductDescription: React.FC<productDescriptionProps> = ({ product }) => {
  const {
    title,
    mrpPrice,
    price,
    discount,
    discountType,
    quantity,
    soldQuantity,
    availableQuantity = 0,
    description,
    sku,
    category,
    subCategory,
    brand,
    thumbnailImage,
    backviewImage,
    images,
    freeShipping,
    inventoryType,
    inventories,
    stock_status,
    label,
    tags,
    averageRating,
    totalReviews,
    specifications,
    metaTitle,
    metaDescription,
  } = product;

  const allImages = [
    thumbnailImage,
    ...(backviewImage ? [backviewImage] : []),
    ...(images ?? []),
  ];

  return (
    <div>
      <Sheet>
        <SheetTrigger className="ml-8 cursor-pointer">
          <Ellipsis size={16} />
        </SheetTrigger>

        <SheetContent className="lg:!max-w-4xl !w-full !max-w-full p-0 bg-gray-50/50 overflow-y-scroll">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Product Details
              </h2>
              <p className="text-sm text-gray-500">
                View complete product information
              </p>
            </div>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Product Title Section - White Background */}
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500 mt-1">SKU: {sku}</p>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                Description
              </h3>
              <div
                className="prose prose-sm max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>

            {/* Key Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pricing Card */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Pricing
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">MRP Price</span>
                    <span className="font-medium text-gray-900">
                      ৳{mrpPrice}
                    </span>
                  </div>
                  {discountType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium text-green-600">
                        {discount}% ({discountType})
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="text-gray-800 font-semibold">
                      Final Price
                    </span>
                    <span className="font-bold text-lg text-blue-600">
                      ৳{price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stock Card */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Inventory
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Quantity</span>
                    <span className="font-medium text-gray-900">
                      {quantity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sold</span>
                    <span className="font-medium text-orange-600">
                      {soldQuantity}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="text-gray-800 font-semibold">
                      Available
                    </span>
                    <span
                      className={`font-bold ${availableQuantity > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {availableQuantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {specifications && specifications.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {specifications.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="font-medium text-gray-700">
                        {item.key}:
                      </span>
                      <span className="text-gray-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags & Labels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags && tags.length > 0 ? (
                    tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
                      >
                        #{tag.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No tags available
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Status
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock Status</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        stock_status === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {stock_status || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{freeShipping || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Label</span>
                    <span className="font-medium">{label || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Images */}
            {allImages && allImages.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Images
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {allImages.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white"
                    >
                      <Image
                        src={image}
                        alt={`Product image ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inventory Details */}
            {inventories && inventories.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Inventory Variants
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Type: {inventoryType}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {inventories.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-400 transition-colors"
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800">
                            Size {item.size}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                            {item.colorName}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Quantity</span>
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Sold</span>
                          <span className="text-orange-600">
                            {item.soldQuantity || 0}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Hold</span>
                          <span className="text-yellow-600">
                            {item.holdQuantity || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category & Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Category
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">
                      {category?.categoryName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subcategory</span>
                    <span className="font-medium">
                      {subCategory?.subcategoryName || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brand</span>
                    <span className="font-medium">{brand?.title || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Reviews
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Rating</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="font-bold text-gray-900">
                        {averageRating || "0"}
                      </span>
                      <span className="text-gray-400 text-sm">/ 5</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-medium">{totalReviews || "0"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Section */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                SEO Settings
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Meta Title</p>
                  <p className="text-sm font-medium text-gray-800">
                    {metaTitle || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Meta Description</p>
                  <p className="text-sm text-gray-600">
                    {metaDescription || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Warranty:</span>
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border border-gray-200 flex items-center justify-center ">
              <Barcode
                value={product.barcode ?? "NO GENERATED"}
                format="CODE128"
                width={2}
                height={70}
                displayValue={true}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductDescription;
