/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { Trash } from "lucide-react";
import Pagination from "@/reuseble_components/Paginations";
import EditProduct from "./EditProduct";
import { useDeleteProduct, useUpdateProduct } from "@/hooks/product.hook";


import ProductDescription from "./ProductDescription";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { toast } from "sonner";
import { TMeta, TProduct } from "@/types";
import React from "react";

import StatusSelect from "@/reuseble_components/StatusSelect";
import { mutationToast } from "@/reuseble_components/MutationToast";

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "InActive" },
];

const tableHeaders = [
  "SL",
  "Title",
  "Front-View",
  "Back-View",
  "Description",
  "Discount Type",
  "Discount",
  "MRP",
  "Price",
  "Inventory Type",
  "Inventory Details",
  "Quantity",
  "AvailableQuantity",
  "Category",
  "Subcategory",
  "Brand",
  "Status",
  "Action",
];

interface ProductsListProps {
  products: TProduct[];
  meta: TMeta;
  isLoading: boolean;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  meta,
  isLoading,
  setPage,
  setLimit,
}) => {
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate } = useUpdateProduct();

  const handleDelete = (id: string) => {
    toast("Delete Product?", {
      description: "This product will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteProduct(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "Product deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete Product",
              );
            },
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 10000, // Keeps the confirmation toast visible for 10 seconds
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product List</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your products inventory
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-transparent border-b border-gray-200">
              {tableHeaders.map((header) => (
                <TableHead
                  key={header}
                  className="text-xs font-semibold text-gray-600 uppercase tracking-wider py-3 px-4"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <TableSkeleton rows={5} />
          ) : (
            <TableBody>
              {products?.length ? (
                products?.map((product: TProduct, index: number) => (
                  <TableRow
                    key={product._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    {/* S.No */}
                    <TableCell className="text-center text-sm text-gray-500 py-3 px-4">
                      {index + 1}
                    </TableCell>

                    {/* Title */}
                    <TableCell className="max-w-[150px] py-3 px-4">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.title}
                      </p>
                    </TableCell>

                    {/* Front Image */}
                    <TableCell className="text-center py-3 px-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 mx-auto">
                        <Image
                          src={product.thumbnailImage}
                          alt={product.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                          
                        />
                      </div>
                    </TableCell>

                    {/* Back Image */}
                    <TableCell className="text-center py-3 px-4">
                      {product.backviewImage ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 mx-auto">
                          <Image
                            src={product.backviewImage}
                            alt={product.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </TableCell>

                    {/* Description */}
                    <TableCell className="py-3 px-4">
                      <ProductDescription product={product} />
                    </TableCell>

                    {/* Discount Type */}
                    <TableCell className="text-center py-3 px-4">
                      {product.discountType ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.discountType}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </TableCell>

                    {/* Discount */}
                    <TableCell className="text-center py-3 px-4">
                      {product.discount ? (
                        <span className="text-sm font-medium text-green-600">
                          {product.discount}%
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">0%</span>
                      )}
                    </TableCell>

                    {/* MRP */}
                    <TableCell className="text-center py-3 px-4">
                      <span className="text-sm text-gray-500 line-through">
                        ৳{product.mrpPrice}
                      </span>
                    </TableCell>

                    {/* Price */}
                    <TableCell className="text-center py-3 px-4">
                      <span className="text-sm font-bold text-gray-900">
                        ৳{product.price}
                      </span>
                    </TableCell>

                    {/* Inventory Type */}
                    <TableCell className="text-center py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {product.inventoryType}
                      </span>
                    </TableCell>

                    {/* Inventories */}
                    <TableCell className="text-sm p-1 grid grid-cols-3 gap-1 w-105">
                      {product.inventories?.map((item) => (
                        <div
                          key={item._id}
                          className="border border-gray-200 rounded-md p-2  hover:shadow-sm transition-all duration-200"
                        >
                          <div>
                            <p className="text-gray-700">
                              <span className="font-semibold text-gray-600">
                                Size :
                              </span>{" "}
                              <span className="font-medium">
                                {item.size ? item.size : "N/A"}
                              </span>
                            </p>
                            <p className="text-gray-700">
                              <span className="font-semibold text-gray-600">
                                Color :
                              </span>{" "}
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {item.colorName ? item.colorName : "N/A"}
                              </span>
                            </p>
                            <p className="text-gray-700">
                              <span className="font-semibold text-gray-600">
                                Quantity :
                              </span>{" "}
                              <span className="font-bold text-gray-900">
                                {item.quantity}
                              </span>
                            </p>
                          </div>

                          <div className="mt-1.5 pt-1.5 border-t border-gray-300">
                            <p className="text-green-600 font-medium">
                              <span className="font-semibold text-gray-600">
                                Sold :
                              </span>{" "}
                              {product.soldQuantity || 0}
                            </p>
                            <p className="text-orange-500 font-medium">
                              <span className="font-semibold text-gray-600">
                                Hold :
                              </span>{" "}
                              0
                            </p>
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    {/* Quantity */}
                    <TableCell className="text-center py-3 px-4">
                      <span className="text-sm font-medium text-gray-900">
                        {product.quantity}
                      </span>
                    </TableCell>

                    {/* Available Quantity */}
                    <TableCell className="text-center py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          (product?.availableQuantity ?? 0) > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.availableQuantity}
                      </span>
                    </TableCell>

                    {/* Category */}
                    <TableCell className="text-center py-3 px-4">
                      <span className="text-sm text-gray-700">
                        {product?.category?.categoryName || "N/A"}
                      </span>
                    </TableCell>

                    {/* Sub Category */}
                    <TableCell className="text-center py-3 px-4">
                      <span className="text-sm text-gray-700">
                        {product.subCategory
                          ? product.subCategory.subcategoryName
                          : "N/A"}
                      </span>
                    </TableCell>

                    {/* Brand */}
                    <TableCell className="text-center py-3 px-4">
                      <span className="text-sm text-gray-700">
                        {product.brand ? product.brand.title : "N/A"}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-3">
                      <StatusSelect
                        value={product.status ?? "Active"}
                        options={statusOptions}
                        className="w-[100px]"
                        onChange={(status) => {
                          const formData = new FormData();
                          formData.append("status", status);
                          mutate(
                            {
                              id: product._id,
                              formData,
                            },
                            mutationToast,
                          );
                        }}
                      />
                    </TableCell>

                    {/* Action */}
                    <TableCell className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                          <Trash size={16} />
                        </button>

                        <EditProduct product={product} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableHeaders.length}
                    className="text-center py-16 text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        className="w-12 h-12 text-gray-300"
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
                      <p className="text-lg font-medium text-gray-700">
                        No products found
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first product
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Footer/Pagination */}
      <div className="py-4 px-4">
        <Pagination
          page={meta?.page}
          limit={meta?.limit}
          total={meta?.total}
          setPage={setPage}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
};

export default ProductsList;
