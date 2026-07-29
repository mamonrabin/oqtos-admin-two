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
import { THomeControll } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";

import {
  useAllHomes,
  useDeleteHome,
  useUpdateHome,
} from "@/hooks/homeController.hook";
import { mutationToast } from "@/reuseble_components/MutationToast";
import StatusSelect from "@/reuseble_components/StatusSelect";
import EditHomeController from "./EditHomeController";

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "InActive" },
];
const pagesections = [
  { label: "Categories", value: "Categories" },
  { label: "Best Selling", value: "Best Selling" },
  { label: "Flash Sale", value: "Flash Sale" },
  { label: "Featured Products", value: "Featured Products" },
  { label: "New Arrivals", value: "New Arrivals" },
  { label: "About", value: "About" },
  { label: "Brands", value: "Brands" },
  { label: "Testimonials", value: "Testimonials" },
  { label: "FAQ", value: "FAQ" },
  { label: "Newsletter", value: "Newsletter" },
];
const ordersections = [
  { label: "first", value: "first" },
  { label: "second", value: "second" },
  { label: "third", value: "third" },
  { label: "fourth", value: "fourth" },
  { label: "fifth", value: "fifth" },
  { label: "sixth", value: "sixth" },
  { label: "seventh", value: "seventh" },
  { label: "eighth", value: "eighth" },
  { label: "ninth", value: "ninth" },
  { label: "tenth", value: "tenth" },
];

const tableHeaders = [
  "SL",
  "title",
  "sub title",
  "section type",
  "order List",
  "status",
  "Actions",
];

const HomeControllerList = () => {
  const { data: homeList, isLoading } = useAllHomes();
  const { mutate } = useUpdateHome();

  const { mutate: deleteHomeSection } = useDeleteHome();

  const homeItems = homeList?.data;



  const handleDelete = (id: string) => {
    toast("Delete HomeSection?", {
      description: "This item will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteHomeSection(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "item deleted successfully");
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
            <h2 className="text-xl font-bold text-gray-900">
              HomeSection List
            </h2>
            <p className="text-sm text-gray-500">
              Total{" "}
              <span className="font-semibold text-gray-700">
                {homeItems?.length || 0}
              </span>{" "}
              item
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
              {homeItems?.length ? (
                homeItems.map((item: THomeControll, index: number) => (
                  <TableRow
                    key={item._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {item?.title?.slice(0, 25) || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {item?.subTitle ? (
                        <span className="text-sm text-gray-900">
                          {item.subTitle.slice(0, 35)}...
                        </span>
                      ) : (
                        <span>N/A</span>
                      )}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <StatusSelect
                        value={item.landing}
                        options={pagesections}
                        className="w-[130px]"
                        onChange={(landing) => {
                          mutate(
                            {
                              id: item._id,
                              payload: {
                                landing,
                              },
                            },
                            mutationToast,
                          );
                        }}
                      />
                     
                    </TableCell>

                    <TableCell className="py-3 px-4">
                        <StatusSelect
                        value={item.order}
                        options={ordersections}
                        className="w-[100px]"
                        onChange={(order) => {
                          mutate(
                            {
                              id: item._id,
                              payload: {
                                order,
                              },
                            },
                            mutationToast,
                          );
                        }}
                      />
                 
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <StatusSelect
                        value={item.status ?? "Active"}
                        options={statusOptions}
                        className="w-[100px]"
                        onChange={(status) => {
                          mutate(
                            {
                              id: item._id,
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
                          onClick={() => handleDelete(item._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                          <Trash size={16} />
                        </button>
                        {/* <EditAbout about={about} /> */}
                        <EditHomeController item={item} />
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
                        No item controller
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your home controller
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

export default HomeControllerList;
