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


import { Trash, Package } from "lucide-react";
import Pagination from "@/reuseble_components/Paginations";
// import EditBrand from "./EditBrand";
import { useState } from "react";



import { TCoupon } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { toast } from "sonner";
import { useCoupons, useDeleteCoupon, useUpdateCoupon } from "@/hooks/coupon.hook";
import EditCoupon from "./EditCoupon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mutationToast } from "@/reuseble_components/MutationToast";
import StatusSelect from "@/reuseble_components/StatusSelect";

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "InActive" },
];

const tableHeaders = [
  "SL",
  "Coupon Code",
  "Discount Type",
  "Discount",
  "User Limit",
  "Per User Limit",
  "Use Count",
  "Start Date",
  "Expire Date",
  "Coupon Type",
  "Brand",
  "Category",
  "Subcategory",
  "status",
  "Action",
];

const CouponList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: couponList, isLoading } = useCoupons(page, limit);
  const { mutate: deleteCoupon } = useDeleteCoupon();
    const { mutate} = useUpdateCoupon();

  const coupons = couponList?.data?.data;
  const meta = couponList?.data?.meta;

  console.log("/////////////---coupons/////////////", couponList);

  const handleDelete = (id: string) => {
    toast("Delete Coupon?", {
      description: "This coupon will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteCoupon(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "Coupon deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete coupon",
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
            <Package size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Coupon List</h2>
            <p className="text-sm text-gray-500">
              Total{" "}
              <span className=" text-gray-700">
                {meta?.total || 0}
              </span>{" "}
              coupons
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
                  className="text-xs  text-gray-600 uppercase tracking-wider py-3 px-4"
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
              {coupons?.length ? (
                coupons?.map((coupon: TCoupon, index: number) => (
                  <TableRow
                    key={coupon._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900 ">
                        {coupon.code}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-center">
                      <span className="text-sm  text-gray-900 ">
                        {coupon.discountType}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900 ">
                        {coupon.discount}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900 ">
                        {coupon.useLimit}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900 ">
                        <TableCell className="text-center">
                          {coupon.perUserLimit || "01"}
                        </TableCell>
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900 ">
                        {coupon.used ? coupon.used : "00"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900 ">
                        {new Date(coupon.startDate).toLocaleDateString("en-US")}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900 ">
                        {new Date(coupon.expireDate).toLocaleDateString(
                          "en-US",
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900 ">
                        {coupon.couponType}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900 ">
                        {coupon?.brandID?.title ? coupon.brandID.title : "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900 ">
                        {coupon?.categoryID?.categoryName
                          ? coupon.categoryID.categoryName
                          : "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900 ">
                        {coupon?.subCategoryID?.subcategoryName
                          ? coupon.subCategoryID.subcategoryName
                          : "N/A"}
                      </span>
                    </TableCell>


                        <TableCell className="py-3 px-3">

                          <StatusSelect
                      value={coupon.status ?? "Active"}
                      options={statusOptions}
                      className="w-[100px]"
                      onChange={(status) => {
                        mutate(
                          {
                            id: coupon._id,
                            payload: {
                            status,
                            },
                          },
                          mutationToast,
                        );
                      }}
                    />
                     
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(coupon._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                          title="Delete Brand"
                        >
                          <Trash size={16} />
                        </button>
                       
                        <EditCoupon coupon={coupon}/>
                    
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
                        <Package size={32} className="text-gray-300" />
                      </div>
                      <p className="text-lg font-medium text-gray-700">
                        No coupons found
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first coupon
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

export default CouponList;
