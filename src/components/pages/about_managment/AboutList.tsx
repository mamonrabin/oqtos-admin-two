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




const aboutTypes = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "InActive" },
];


import { toast } from "sonner";
import { TAbout } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { useAllAbouts, useDeleteAbout, useUpdateAbout } from "@/hooks/about.hook";
import AboutDescription from "./AboutDescription";
import EditAbout from "./EditAbout";
import StatusSelect from "@/reuseble_components/StatusSelect";
import { mutationToast } from "@/reuseble_components/MutationToast";

const tableHeaders = ["SL", "description", "type", "Actions"];

const AboutList = () => {
  const { data: allAboutes, isLoading } = useAllAbouts();
  const { mutate: deletePolicy } = useDeleteAbout();
    const { mutate} = useUpdateAbout();

  const aboutes = allAboutes?.data;

  const handleDelete = (id: string) => {
    toast("Delete About?", {
      description: "This about will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deletePolicy(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "About deleted successfully");
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
            <h2 className="text-xl font-bold text-gray-900">About List</h2>
            <p className="text-sm text-gray-500">
              Total <span className="font-semibold text-gray-700">{aboutes?.length}</span> about
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
              {aboutes?.length ? (
                aboutes.map((about: TAbout, index: number) => (
                  <TableRow
                    key={about._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900 capitalize">
                        <AboutDescription about={about} />
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                     
                      <StatusSelect
                        value={about.type}
                        options={aboutTypes}
                        className="w-[100px]"
                        onChange={(type) => {
                          mutate(
                            {
                              id: about._id,
                              payload: {
                                type,
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
                          onClick={() => handleDelete(about._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                          <Trash size={16} />
                        </button>
                        <EditAbout about={about} />
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
                        No about found
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first about
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

export default AboutList;
