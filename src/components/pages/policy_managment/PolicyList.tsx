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
import { TPolicy } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { useAllPolicys, useDeletePolicy, useUpdatePolicy } from "@/hooks/policy.hook";
import PolicyDescription from "./PolicyDescription";
import EditPolicy from "./EditPolicy";
import { mutationToast } from "@/reuseble_components/MutationToast";
import StatusSelect from "@/reuseble_components/StatusSelect";

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "InActive" },
];

const tableHeaders = [
  "SL",
  "Title",
  "description",
  "type",
  "status",
  "Actions",
];

const PolicyList = () => {
  const { data: policies, isLoading } = useAllPolicys();
  const { mutate: deletePolicy } = useDeletePolicy();
    const { mutate} = useUpdatePolicy();

  const allPolices = policies?.data;

  const handleDelete = (id: string) => {
    toast("Delete Policy?", {
      description: "This policy will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deletePolicy(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "policy deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete policy",
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
            <h2 className="text-xl font-bold text-gray-900">Policy List</h2>
            <p className="text-sm text-gray-500">
              Total <span className="font-semibold text-gray-700">{allPolices?.length || 0}</span>{" "}
              policy
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
              {allPolices?.length ? (
                allPolices.map((policy: TPolicy, index: number) => (
                  <TableRow
                    key={policy._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900 capitalize">
                        {policy?.title?.slice(0,25)}..
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        <PolicyDescription policy={policy} />
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {policy.type}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {policy.type}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <StatusSelect
                      value={policy.status ?? "Active"}
                      options={statusOptions}
                      className="w-[100px]"
                      onChange={(status) => {
                        mutate(
                          {
                            id: policy._id,
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
                          onClick={() => handleDelete(policy._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                          <Trash size={16} />
                        </button>

                        {/* <EditCategory category={category} /> */}
                        <EditPolicy policy={policy} />
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
                        No policy found
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first policy
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

export default PolicyList;
