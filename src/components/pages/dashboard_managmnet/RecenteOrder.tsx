
"use client";

import { TOrder } from "@/types";
import { format } from "date-fns";
import Link from "next/link";

interface OrderProps {
  orders: TOrder[];
}

const RecenteOrder: React.FC<OrderProps> = ({ orders }) => {
  return (
    <div className="mt-6 min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-700 sm:text-base">
            Recent Orders
          </h3>
          <p className="mt-1 text-xs text-gray-400">
            Latest 5 orders
          </p>
        </div>

        <Link
          href="/order-list"
          className="shrink-0 text-xs font-medium text-blue-600 transition hover:text-blue-800"
        >
          View All
        </Link>
      </div>

      {/* RESPONSIVE TABLE */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Order ID
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Customer
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Amount
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders?.length > 0 ? (
              orders.slice(0, 5).map((order, i) => (
                <tr
                  key={order.orderId ?? i}
                  className="transition-colors hover:bg-gray-50/70"
                >
                  {/* ORDER ID */}
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-blue-600">
                    #{order.orderId}
                  </td>

                  {/* CUSTOMER */}
                  <td className="max-w-[200px] px-4 py-3 text-sm text-gray-700">
                    <p className="truncate" title={order.shippingAddress.name}>
                      {order.shippingAddress.name}
                    </p>
                  </td>

                  {/* AMOUNT */}
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-gray-900">
                    ৳{Number(order.totalPrice).toLocaleString("en-BD")}
                  </td>

                  {/* STATUS */}
                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        order.status?.toLowerCase() === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status?.toLowerCase() === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : order.status?.toLowerCase() === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                    {order.createdAt
                      ? format(new Date(order.createdAt), "dd MMM yyyy")
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-gray-400"
                >
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE SCROLL HINT */}
      <div className="border-t border-gray-100 px-4 py-2 text-[11px] text-gray-400 sm:hidden">
        Swipe horizontally to see all order details →
      </div>
    </div>
  );
};

export default RecenteOrder;
