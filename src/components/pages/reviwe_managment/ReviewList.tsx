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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Trash, FolderOpen } from "lucide-react";

import { toast } from "sonner";
import { TReview } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";

import { useState } from "react";

import Paginations from "@/reuseble_components/Paginations";
import {
  useAllReviews,
  useDeleteReview,
  useUpdateReview,
} from "@/hooks/review.hook";
import ReviewText from "./ReviewText";

const tableHeaders = [
  "SL",
  "user_name",
  "user_email",
  "product_title",
  "comment",
  "rating",
  "status",
  "Actions",
];

const ReviewList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: reviewList, isLoading } = useAllReviews(page, limit);
  const { mutate } = useUpdateReview();

  const { mutate: deleteReview } = useDeleteReview();

  const reviews = reviewList?.data;
  const meta = reviewList?.data?.meta;

  console.log(reviews, "--------------------------------------reviews");

  const handleDelete = (id: string) => {
    toast("Delete Review?", {
      description: "This review will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteReview(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "review deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete about",
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
            <h2 className="text-xl font-bold text-gray-900">Review List</h2>
            <p className="text-sm text-gray-500">
              Total <span className="font-semibold text-gray-700">0</span>{" "}
              review
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
              {reviews?.length ? (
                reviews.map((review: TReview, index: number) => (
                  <TableRow
                    key={review._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {review?.userID?.name || "N/A"}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700">
                        {review?.userID?.email || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700">
                        {review.productID.title || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700">
                        <ReviewText review={review} />
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700">
                        {review.rating || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <Select
                        defaultValue={review.type}
                        onValueChange={(value) => {
                          mutate(
                            {
                              id: review._id,
                              payload: {
                                type: value,
                              },
                            },
                            {
                              onSuccess: (res) => {
                                toast.success(
                                  res?.message || "Status updated successfully",
                                );
                              },
                              onError: (error: any) => {
                                toast.error(
                                  error?.response?.data?.message ||
                                    "Something went wrong.",
                                );
                              },
                            },
                          );
                        }}
                      >
                        <SelectTrigger className="w-[100px] rounded">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                          
                          <SelectItem value="pending">pending</SelectItem>
                          <SelectItem value="approve">approve</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                          <Trash size={16} />
                        </button>
                        {/* <EditAbout about={about} /> */}
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
                        No review found
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first review by user
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="py-4 px-4">
        <Paginations
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

export default ReviewList;
