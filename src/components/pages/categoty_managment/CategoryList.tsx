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

import { Trash, FolderOpen } from "lucide-react";
import EditCategory from "./EditCategory";
import Pagination from "@/reuseble_components/Paginations";
import {
  useCategories,
  useDeleteCategory,
  useUpdateCategory,
} from "@/hooks/category.hook";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { TCategory } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusSelect from "@/reuseble_components/StatusSelect";
import { mutationToast } from "@/reuseble_components/MutationToast";

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "InActive" },
];

const tableHeaders = [
  "#",
  "Category Name",
  "Title",
  "Category Image",
  "Status",
  "Actions",
];

const CategoryList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: categorysList, isLoading } = useCategories(page, limit);
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate } = useUpdateCategory();

  const categories = categorysList?.data?.data;
  const meta = categorysList?.data?.meta;

  const handleDelete = (id: string) => {
    toast("Delete Category?", {
      description: "This category will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteCategory(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "Category deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete category",
              );
            },
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 10000,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-lg">
            <FolderOpen size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Category List</h2>
            <p className="text-sm text-gray-500">
              Total{" "}
              <span className="font-semibold text-gray-700">
                {meta?.total || 0}
              </span>{" "}
              categories
            </p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <Table>
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
              {categories?.length ? (
                categories.map((category: TCategory, index: number) => (
                  <TableRow
                    key={category._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900 capitalize">
                        {category.categoryName}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {category.title}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <Image
                          width={300}
                          height={300}
                          src={category.image}
                          alt={category.categoryName}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </TableCell>

                    <TableCell className="py-3 px-3">
                      <StatusSelect
                        value={category.status ?? "Active"}
                        options={statusOptions}
                        className="w-[100px]"
                        onChange={(status) => {
                          const formData = new FormData();
                          formData.append("status", status);
                          mutate(
                            {
                              id: category._id,
                              formData,
                            },
                            mutationToast,
                          );
                        }}
                      />
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                          <Trash size={16} />
                        </button>

                        <EditCategory category={category} />
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
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <FolderOpen size={32} className="text-gray-300" />
                      </div>
                      <p className="text-lg font-medium text-gray-700">
                        No categories found
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first category
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

export default CategoryList;
