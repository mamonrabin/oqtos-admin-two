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

import {  FolderOpen } from "lucide-react";

import { TLowStockAlert } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { useAllOrdersStats} from "@/hooks/stats.hook";

const tableHeaders = [
  "SL",
  "city",
  "totalOrders",
  "totalProductsSold",
  "totalRevenue"
];

const SalesLacation = () => {

      const {data:ordersStats,isLoading} = useAllOrdersStats()

  const orders = ordersStats?.data?.cityStats;

  

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-lg">
            <FolderOpen size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Order Lacation</h2>
            <p className="text-sm text-gray-500">
              Total{" "}
              <span className="font-semibold text-gray-700">
                {orders?.length}
              </span>{" "}
              City
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
              {orders?.length ? (
                orders.map((order : TLowStockAlert, index: number) => (
                  <TableRow
                    key={order._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900 capitalize">
                        {order.city || "N/A"}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {order.totalOrders || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {order.totalProductsSold || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {order.totalRevenue || 0}
                      </span>
                    </TableCell>

                    {/* <TableCell className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          order.alertType === "CRITICAL"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {order.alertType}
                      </span>
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
                        <FolderOpen size={32} className="text-gray-300" />
                      </div>
                      <p className="text-lg font-medium text-gray-700">
                        No  Location
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first Location
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

export default SalesLacation;
