
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

import { format } from "date-fns";
import { Trash, Package } from "lucide-react";
import Pagination from "@/reuseble_components/Paginations";

import { TOrder } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { toast } from "sonner";

import {
  useDeleteOrder,
  useTodayOrders,
  useUpdateOrder,
} from "@/hooks/order.hook";

import ViewOrder from "./ViewOrder";
import SendQuiriar from "./SendQuiriar";
import Invoice from "./Invoice";
import { useState } from "react";

const tableHeaders = [
  "#",
  "Order ID",
  "Date",
  "Products",
  "Qty",
  "Subtotal",
  "Coupon",
  "Discount",
  "Shipping",
  "Total",
  "Payment Method",
  "Payment Status",
  "Customer",
  "Shipping Info",
  "Status",
  "Update Status",
  "Courier",
  "Invoice",
  "Actions",
];

const TodayOrders = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: orderList, isLoading } = useTodayOrders({
    page,
    limit,
  });

  const orders = orderList?.data?.data;
  const meta = orderList?.data?.meta;

  const { mutate } = useUpdateOrder();
  const { mutate: deleteOrder } = useDeleteOrder();

  const hasOrders = (orders?.length ?? 0) > 0;

  const handleDelete = (id: string) => {
    toast("Delete Order?", {
      description: "This order will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteOrder(id, {
            onSuccess: (res: any) => {
              toast.success(
                res?.message || "Order deleted successfully"
              );
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message ||
                  "Failed to delete order"
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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-blue-100 text-blue-800",
      PROCESSING: "bg-purple-100 text-purple-800",
      SHIPPED: "bg-indigo-100 text-indigo-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
      ON_HOLD: "bg-orange-100 text-orange-800",
      IN_REVIEW: "bg-gray-100 text-gray-800",
      RETURNED: "bg-pink-100 text-pink-800",
    };

    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2.5">
            <Package size={20} className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 md:text-xl">
              Today Order List
            </h2>

            <p className="text-sm text-gray-500">
              Total{" "}
              <span className="font-semibold text-gray-700">
                {isLoading
                  ? "..."
                  : meta?.total ?? orders?.length ?? 0}
              </span>{" "}
              orders
            </p>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-200 hover:bg-transparent">
                {tableHeaders.map((header) => (
                  <TableHead
                    key={header}
                    className="whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableSkeleton rows={5} />
          </Table>
        </div>
      )}

      {/* Orders */}
      {!isLoading && hasOrders && (
        <>
          {/* Table Container */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-b border-gray-200 hover:bg-transparent">
                  {tableHeaders.map((header) => (
                    <TableHead
                      key={header}
                      className="whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600"
                    >
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.map((order: TOrder, index: number) => (
                  <TableRow
                    key={order._id}
                    className="border-b border-gray-100 transition-colors hover:bg-gray-50/50"
                  >
                    {/* SL */}
                    <TableCell className="px-3 py-3 text-center text-sm font-medium text-gray-500">
                      {(page - 1) * limit + index + 1}
                    </TableCell>

                    {/* Order ID */}
                    <TableCell className="px-3 py-3">
                      <span className="text-sm font-semibold text-blue-600">
                        #{order.orderId?.slice(0, 8)}
                      </span>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="px-3 py-3">
                      <span className="text-xs text-gray-600">
                        {order.createdAt
                          ? format(
                              new Date(order.createdAt),
                              "dd MMM yyyy"
                            )
                          : "-"}
                      </span>

                      <br />

                      <span className="text-xs text-gray-400">
                        {order.createdAt
                          ? format(
                              new Date(order.createdAt),
                              "hh:mm a"
                            )
                          : "-"}
                      </span>
                    </TableCell>

                    {/* Products */}
                    <TableCell className="min-w-[200px] px-3 py-3">
                      <div className="space-y-1">
                        {order?.products?.slice(0, 2).map((item) => (
                          <div key={item._id} className="text-xs">
                            <span className="font-medium text-gray-700">
                              {item.productRef?.title?.slice(0, 20)}
                              {(item.productRef?.title?.length ?? 0) >
                                20 && "..."}
                            </span>

                            <span className="ml-1 text-gray-400">
                              (x{item.quantity})
                            </span>
                          </div>
                        ))}

                        {(order?.products?.length ?? 0) > 2 && (
                          <span className="text-xs text-blue-600">
                            +{order.products!.length - 2} more
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Quantity */}
                    <TableCell className="px-3 py-3 text-center">
                      <span className="text-sm font-semibold text-gray-900">
                        {order.products?.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}
                      </span>
                    </TableCell>

                    {/* Subtotal */}
                    <TableCell className="px-3 py-3">
                      <span className="text-sm font-medium text-gray-900">
                        ৳{order.subTotalPrice || 0}
                      </span>
                    </TableCell>

                    {/* Coupon */}
                    <TableCell className="px-3 py-3">
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
                        {order.couponRef?.code || "N/A"}
                      </span>
                    </TableCell>

                    {/* Discount */}
                    <TableCell className="px-3 py-3">
                      <span className="text-sm font-medium text-green-600">
                        ৳{order.couponRef?.discount || 0}
                      </span>
                    </TableCell>

                    {/* Shipping */}
                    <TableCell className="px-3 py-3">
                      <span className="text-sm font-medium text-gray-900">
                        ৳{order.shippingCost || 0}
                      </span>
                    </TableCell>

                    {/* Total */}
                    <TableCell className="px-3 py-3">
                      <span className="text-sm font-bold text-blue-600">
                        ৳{order.totalPrice || 0}
                      </span>
                    </TableCell>

                    {/* Payment Method */}
                    <TableCell className="px-3 py-3">
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
                        {order.paymentMethod || "N/A"}
                      </span>
                    </TableCell>

                    {/* Payment Status */}
                    <TableCell className="px-3 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          order.paymentStatus === "PAID"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.paymentStatus || "N/A"}
                      </span>
                    </TableCell>

                    {/* Customer */}
                    <TableCell className="px-3 py-3">
                      <div className="text-xs">
                        <p className="font-medium text-gray-700">
                          {order.userRef?.name || "N/A"}
                        </p>

                        <p className="text-gray-400">
                          {order.userRef?.email?.slice(0, 15) || ""}
                          {(order.userRef?.email?.length ?? 0) > 15 &&
                            "..."}
                        </p>
                      </div>
                    </TableCell>

                    {/* Shipping Info */}
                    <TableCell className="min-w-[150px] px-3 py-3">
                      <div className="space-y-0.5 text-xs">
                        <p>
                          <span className="text-gray-400">
                            Phone:
                          </span>{" "}
                          {order.shippingAddress?.phone || "N/A"}
                        </p>

                        <p>
                          <span className="text-gray-400">
                            Area:
                          </span>{" "}
                          {order.shippingAddress?.thana || "N/A"}
                        </p>

                        <p className="max-w-[120px] truncate text-gray-400">
                          {order.shippingAddress?.address || "N/A"}
                        </p>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status || "N/A"}
                      </span>
                    </TableCell>

                    {/* Update Status */}
                    <TableCell className="px-3 py-3">
                      <Select
                        onValueChange={(value) => {
                          mutate(
                            {
                              id: order._id,
                              payload: {
                                status: value,
                              },
                            },
                            {
                              onSuccess: (res) => {
                                toast.success(
                                  res?.message ||
                                    "Status updated successfully"
                                );
                              },

                              onError: (error: any) => {
                                toast.error(
                                  error?.response?.data?.message ||
                                    "Something went wrong."
                                );
                              },
                            }
                          );
                        }}
                      >
                        <SelectTrigger className="h-8 w-[110px] rounded-lg border-gray-300 text-xs">
                          <SelectValue placeholder="Update" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="PENDING">
                            Pending
                          </SelectItem>

                          <SelectItem value="CONFIRMED">
                            Confirmed
                          </SelectItem>

                          <SelectItem value="PROCESSING">
                            Processing
                          </SelectItem>

                          <SelectItem value="SHIPPED">
                            Shipped
                          </SelectItem>

                          <SelectItem value="DELIVERED">
                            Delivered
                          </SelectItem>

                          <SelectItem value="CANCELLED">
                            Cancelled
                          </SelectItem>

                          <SelectItem value="ON_HOLD">
                            On Hold
                          </SelectItem>

                          <SelectItem value="IN_REVIEW">
                            In Review
                          </SelectItem>

                          <SelectItem value="RETURNED">
                            Returned
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    {/* Courier */}
                    <TableCell className="px-3 py-3">
                      <SendQuiriar order={order} />
                    </TableCell>

                    {/* Invoice */}
                    <TableCell className="px-3 py-3">
                      <Invoice order={order} />
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="rounded-lg bg-red-50 p-1.5 text-red-600 transition-all duration-200 hover:bg-red-100"
                          title="Delete Order"
                        >
                          <Trash size={14} />
                        </button>

                        <ViewOrder order={order} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-gray-50/50 px-6 py-4 sm:flex-row">
            <Pagination
              page={meta?.page}
              limit={meta?.limit}
              total={meta?.total}
              setPage={setPage}
              setLimit={setLimit}
            />
          </div>
        </>
      )}

      {/* Empty State */}
      {!isLoading && !hasOrders && (
        <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Package size={32} className="text-gray-300" />
          </div>

          <p className="text-lg font-medium text-gray-700">
            Today No orders found
          </p>

          <p className="text-sm text-gray-400">
            Orders will appear here once placed
          </p>
        </div>
      )}
    </div>
  );
};

export default TodayOrders;


