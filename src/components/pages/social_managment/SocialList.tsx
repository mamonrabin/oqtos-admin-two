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

import { toast } from "sonner";
import { TSocial } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";

import { useAllSocials, useDeleteSocial, useUpdateSocial } from "@/hooks/social.hook";
import EditSocila from "./EditSocila";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tableHeaders = ["SL", "Socila Media", "Link", "type", "Actions"];

const SocialList = () => {
  const { data: socialLinks, isLoading } = useAllSocials();
  const { mutate: deleteSocialLink } = useDeleteSocial();
  const { mutate } = useUpdateSocial();

  const sociles = socialLinks?.data;

  const handleDelete = (id: string) => {
    toast("Delete link?", {
      description: "This link will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteSocialLink(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "link deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete link",
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
            <h2 className="text-xl font-bold text-gray-900">
              Social Media List
            </h2>
            <p className="text-sm text-gray-500">
              Total <span className="font-semibold text-gray-700">0</span> link
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
              {sociles?.length ? (
                sociles.map((social: TSocial, index: number) => (
                  <TableRow
                    key={social._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {social.socialType}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700">
                        {social.link}
                      </span>
                    </TableCell>

                    {/* <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {social.type}
                      </span>
                    </TableCell> */}

                     <TableCell className="py-3 px-4">
                      <Select
                        defaultValue={social.type}
                        onValueChange={(value) => {
                          mutate(
                            {
                              id: social._id,
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

                        <SelectContent >
                          <SelectItem  value="ACTIVE">ACTIVE</SelectItem>
                          <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                          
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(social._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                          <Trash size={16} />
                        </button>

                        {/* <EditCategory category={category} /> */}
                        {/* <EditPolicy social={social}/> */}
                        <EditSocila social={social} />
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
                        No social found
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first social
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

export default SocialList;
