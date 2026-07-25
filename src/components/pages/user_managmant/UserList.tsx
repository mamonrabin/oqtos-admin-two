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

import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { toast } from "sonner";

import { useAllUsers, useDeleteUser, useUpdateUser } from "@/hooks/user.hook";
import { TUser } from "@/types";
import Image from "next/image";
import SelectInput from "@/reuseble_components/SelectInput";
import { useForm } from "react-hook-form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FormData = {
  date: string;
};

const dates = [
  { label: "Today", value: "today" },
  { label: "yesterday", value: "yesterday" },
  { label: "This Week", value: "this-week" },
  { label: "This Month", value: "this-month" },
  { label: "This Year", value: "this-year" },
];

const tableHeaders = [
  "SL",
  "Image",
  "name",
  "email",
  "provider",
  "phone",
  "address",
  "status",
  "role",
  "Date",
  "Action",
];

const UserList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [dateFilter, setDateFilter] = useState<string>("");

  const { data: userList, isLoading } = useAllUsers(page, limit, dateFilter);
  const { mutate: deleteUser } = useDeleteUser();

  const users = userList?.data;
  const meta = userList?.data?.meta;

  const { mutate} = useUpdateUser();





  const {
    control,
    reset,
    // formState: { errors },
  } = useForm<FormData>();

  const handleReset = () => {
    reset();

    setDateFilter("");
  };

  const handleDelete = (id: string) => {
    toast("Delete Coupon?", {
      description: "This user will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteUser(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "User deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete user",
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
      <div className="flex md:flex-row flex-col md:items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-lg">
            <Package size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">User List</h2>
            <p className="text-sm text-gray-500">
              Total{" "}
              <span className="font-semibold text-gray-700">
                {meta?.total || 0}
              </span>{" "}
              users
            </p>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-2">
          <SelectInput<FormData>
            label=""
            name="date"
            options={dates}
            control={control}
            onValueChange={(value) => {
              setDateFilter(value);
            }}
            placeholder="Select date"
            placeholderColor="!text-gray-600"
            inputstyle="bg-gray-50 w-full text-gray-700 border border-gray-300 rounded !h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 bg-primary hover:bg-primary/80 cursor-pointer text-secondary text-sm font-medium rounded transition-colors"
          >
            Reset
          </button>
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
              {users?.length ? (
                users?.map((user: TUser, index: number) => (
                  <TableRow
                    key={user._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        {user.picture ? (
                          <Image
                            width={300}
                            height={300}
                            src={user.picture}
                            alt={user.name}
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
                      <span className="text-sm font-semibold text-gray-900">
                        {user.name || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {user.email || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {user.auths?.[0]?.provider || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {user.phone || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {user.address || "N/A"}
                      </span>
                    </TableCell>
                  
                           <TableCell className="py-3 px-4">
                      <Select
                        defaultValue={user.isActive}
                        onValueChange={(value) => {
                          mutate(
                            {
                              id: user._id,
                              payload: {
                                isActive: value,
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
                          <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                          <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                          <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>


                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {user.role || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                          title="Delete Brand"
                        >
                          <Trash size={16} />
                        </button>
                        {/* <EditCoupon user={user} /> */}
                        {/* <EditUser  user={user} /> */}
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
                        No users found
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first user
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

export default UserList;
