"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Package } from "lucide-react";

import TableSkeleton from "@/reuseble_components/TableSkeleton";

import { useAllStaffs } from "@/hooks/user.hook";
import { TUser } from "@/types";
import Image from "next/image";

import { useForm } from "react-hook-form";

type FormData = {
  date: string;
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700 border-green-300";
    case "ADMIN":
      return "bg-green-100 text-green-700 border-green-300";
    case "INACTIVE":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "STAFF":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "BLOCKED":
      return "bg-red-100 text-red-700 border-red-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

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
  "joinig Date",
];

const Staffs = () => {
  const { data: userList, isLoading } = useAllStaffs();
  const users = userList?.data;

  const {} = useForm<FormData>();
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex md:flex-row flex-col md:items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-lg">
            <Package size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Staffs List</h2>
            <p className="text-sm text-gray-500">
              Total <span className=" text-gray-700">{users?.length ?? 0}</span>{" "}
              staffs
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
                      <span className="text-sm  text-gray-900">
                        {user.name || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900">
                        {user.email || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900">
                        {user.auths?.[0]?.provider || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900">
                        {user.phone || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900">
                        {user.address || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusColor(user?.isActive)}`}
                      >
                        {user?.isActive || "N/A"}
                      </span>
                    </TableCell>
                    
                    <TableCell className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusColor(user?.role)}`}
                      >
                        {user?.role || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm  text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </TableCell>

                    {/* <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                          title="Delete Brand"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </TableCell> */}
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
                        No staffs found
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first staffs
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Staffs;
