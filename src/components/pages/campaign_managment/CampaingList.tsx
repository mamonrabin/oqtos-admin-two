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

// import { useDeleteCategory } from "@/hooks/compain.hook";

import { toast } from "sonner";
import { TCampaign } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { useAllCampaigns, useDeleteCampaign, useUpdateampaign } from "@/hooks/campaign.hook";
import Image from "next/image";
import { BASE_URL } from "@/config";
import EditCampaing from "./EditCampaing";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tableHeaders = [
  "#",
  "Title",
  "Image",
  "Coupon Code",
  "Coupon Type",
  "Discount",
  "status",
  "Action",
];

const CampaingList = () => {
  const { data: compainList, isLoading } = useAllCampaigns();
  const { mutate: deleteCampaing } = useDeleteCampaign();
  const { mutate} = useUpdateampaign();

  const compaines = compainList?.data;

  const handleDelete = (id: string) => {
    toast("Delete Compaing?", {
      description: "This campain will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteCampaing(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "campaing deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete compain",
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
            <h2 className="text-xl font-bold text-gray-900">Campaing List</h2>
            <p className="text-sm text-gray-500">
              Total <span className="font-semibold text-gray-700">{compaines?.length || 0}</span>{" "}
              campaing
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
              {compaines?.length ? (
                compaines.map((compain: TCampaign, index: number) => (
                  <TableRow
                    key={compain._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900 capitalize">
                        {compain.title}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        {compain.image ? (
                          <Image
                            width={300}
                            height={300}
                            src={BASE_URL + compain.image}
                            alt={compain.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            N/A
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {compain?.couponId?.code}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {compain?.couponId?.couponType}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {compain?.couponId?.discount}
                      </span>
                    </TableCell>


                     <TableCell className="py-3 px-3">
                      <Select
                        defaultValue={compain.status ? compain.status : "N/A"}
                        onValueChange={(value) => {
                          const formData = new FormData();
                          formData.append("status", value);

                          mutate(
                            {
                              id: compain._id,
                              formData,
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
                        <SelectTrigger className="w-[110px] h-8 text-xs rounded-lg border-gray-300">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="InActive">InActive</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(compain._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                          <Trash size={16} />
                        </button>
                        {/* <EditCategory compain={compain} /> */}
                        <EditCampaing compain={compain}  />
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
                        Start by adding your first compain
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
      {/* <div className="py-4 px-4">
        <Pagination
          page={meta?.page}
          limit={meta?.limit}
          total={meta?.total}
          setPage={setPage}
          setLimit={setLimit}
        />
      </div> */}
    </div>
  );
};

export default CampaingList;
