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

import { BASE_URL } from "@/config";
import Image from "next/image";
import { toast } from "sonner";
import { TLogo } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { useAllLogo, useDeleteLogo, useUpdateLogo } from "@/hooks/setLogo.hook";
import FooterDescription from "./FooterDescription";
import EditLogo from "./EditLogo";
import StatusSelect from "@/reuseble_components/StatusSelect";
import { mutationToast } from "@/reuseble_components/MutationToast";

// const logoTypes = [
//   { label: "Active", value: "active" },
//   { label: "In Active", value: "inactive" },
// ];

// type LogoFormData = {
//   type: string;
// };



const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "InActive" },
];



const tableHeaders = [
  "SL",
  "headerLogo",
  "footerLogo",
  "description",
  "Status Type",
  "Update Status",
  "address",
  "phone",
  "whatsapp",
  "email",
  "Actions",
];

const LogoList = () => {
  const { data: logoList, isLoading } = useAllLogo();
  const { mutate: deleteLogo } = useDeleteLogo();
  const logoes = logoList?.data;

  const { mutate } = useUpdateLogo();

  const handleDelete = (id: string) => {
    toast("Delete Logo?", {
      description: "This logo will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteLogo(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "Logo deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete logo",
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
            <h2 className="text-xl font-bold text-gray-900">Logo List</h2>
            <p className="text-sm text-gray-500">
              Total <span className="font-semibold text-gray-700"> 0</span>{" "}
              logoes
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
            <TableBody className="overflow-y-scroll">
              {logoes?.length ? (
                logoes.map((logo: TLogo, index: number) => (
                  <TableRow
                    key={logo._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <Image
                          width={300}
                          height={300}
                          src={BASE_URL + logo.headerLogo}
                          alt="hearder"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                    </TableCell>

                    <TableCell className="py-3 px-4 text-center">
                      {logo.footerLogo ? (
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 mx-auto">
                          <Image
                            src={BASE_URL + logo.footerLogo}
                            alt="FOOTER LOGO"
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold">
                        <FooterDescription logo={logo} />
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 ">
                        {logo.status || "N/A"}
                      </span>
                    </TableCell>


                    <TableCell className="py-3 px-4">
                      <StatusSelect
                        value={logo.status ?? "Active"}
                        options={statusOptions}
                        className="w-[100px]"
                        onChange={(status) => {
                          const formData = new FormData();
                          formData.append("status", status);
                          mutate(
                            {
                              id: logo._id,
                              formData,
                            },
                            mutationToast,
                          );
                        }}
                      />
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 ">
                        {logo.address || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 ">
                        {logo.phone || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 ">
                        {logo.whatsapp || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 ">
                        {logo.email || "N/A"}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(logo._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                          <Trash size={16} />
                        </button>
                        <EditLogo logo={logo} />
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
                        No logoes found
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first logo
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

export default LogoList;
