/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Eye,
  Package,
  User,
  MapPin,
  CreditCard,
  Truck,
  Calendar,
  DollarSign,
  ShoppingBag,
  Phone,
  Mail,
  Hash,
  Clock,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { TOrder } from "@/types";
import { useState } from "react";

interface ViewOrderProps {
  order?: TOrder;
}

const ViewOrder = ({ order }: ViewOrderProps) => {
  const [open, setOpen] = useState(false);

  const getStatusColor = (status?: string) => {
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
    return status
      ? colors[status] || "bg-gray-100 text-gray-800"
      : "bg-gray-100 text-gray-800";
  };

  const getPaymentStatusColor = (status?: string) => {
    return status === "PAID"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-200 hover:shadow-sm"
            title="View Order"
          >
            <Eye size={16} />
          </button>
        </SheetTrigger>

        <SheetContent className="md:!max-w-4xl !w-full p-0 bg-gray-50/50">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Package size={18} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Order Details
                </h2>
                <p className="text-sm text-gray-500">
                  #{order?.orderId || "N/A"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
            {/* Order Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Calendar size={16} />
                  <span>Date</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {order?.createdAt
                    ? format(new Date(order.createdAt), "dd MMM yyyy")
                    : "N/A"}
                </p>
                <p className="text-xs text-gray-400">
                  {order?.createdAt
                    ? format(new Date(order.createdAt), "hh:mm a")
                    : ""}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <DollarSign size={16} />
                  <span>Total</span>
                </div>
                <p className="text-lg font-bold text-blue-600">
                  ৳{order?.totalPrice || 0}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <CreditCard size={16} />
                  <span>Payment</span>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {order?.paymentMethod || "N/A"}
                </p>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-1 ${getPaymentStatusColor(order?.paymentStatus)}`}
                >
                  {order?.paymentStatus || "N/A"}
                </span>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Truck size={16} />
                  <span>Status</span>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full inline-block ${getStatusColor(order?.status)}`}
                >
                  {order?.status || "N/A"}
                </span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-700">
                    Customer Information
                  </h3>
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <User size={12} /> Name
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.userRef?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Mail size={12} /> Email
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.userRef?.email || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Phone size={12} /> Phone
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.shippingAddress?.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Hash size={12} /> User ID
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.userRef?._id?.slice(0, 12) || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-700">
                    Shipping Address
                  </h3>
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Name</p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.shippingAddress?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.shippingAddress?.email || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.shippingAddress?.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Alternate Phone</p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.shippingAddress?.altPhone || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">City</p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.shippingAddress?.city || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Thana</p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.shippingAddress?.thana || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-400">Address</p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.shippingAddress?.house &&
                      `${order.shippingAddress.house}, `}
                    {order?.shippingAddress?.road &&
                      `Road ${order.shippingAddress.road}, `}
                    {order?.shippingAddress?.address || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Shipping Cost</p>
                  <p className="text-sm font-medium text-gray-900">
                    ৳{order?.shippingCost || 0}
                  </p>
                </div>
                {order?.note && (
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-400">Note</p>
                    <p className="text-sm font-medium text-gray-900 bg-yellow-50 p-2 rounded border border-yellow-200">
                      {order.note}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Products */}
            <div className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              {/* Header */}
              <div className="border-b border-gray-200 bg-gray-50 px-3 py-3 sm:px-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={16} className="shrink-0 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-700">
                    Products ({order?.products?.length || 0})
                  </h3>
                </div>
              </div>

              {/* Responsive Table */}
              <div className="w-full overflow-x-auto overscroll-x-contain">
                <table className="w-full min-w-[750px] text-left">
                  <thead className="bg-gray-50/70">
                    <tr>
                      {[
                        "#",
                        "Product",
                        "Color",
                        "Size",
                        "Qty",
                        "Price",
                        "Total",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-4"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {order?.products?.length ? (
                      order.products.map((item: any, index: number) => (
                        <tr
                          key={item._id || index}
                          className="transition-colors hover:bg-gray-50/70"
                        >
                          {/* Index */}
                          <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500 sm:px-4">
                            {index + 1}
                          </td>

                          {/* Product */}
                          <td className="max-w-[240px] px-3 py-3 sm:px-4">
                            <p
                              title={item.productRef?.title || "N/A"}
                              className="truncate text-sm font-medium text-gray-900"
                            >
                              {item.productRef?.title || "N/A"}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                              ID: {item.productRef?._id?.slice(0, 8) || "N/A"}
                            </p>
                          </td>

                          {/* Color */}
                          <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-700 sm:px-4">
                            {item.color || "N/A"}
                          </td>

                          {/* Size */}
                          <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-700 sm:px-4">
                            {item.size || "N/A"}
                          </td>

                          {/* Quantity */}
                          <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900 sm:px-4">
                            {item.quantity}
                          </td>

                          {/* Price */}
                          <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-700 sm:px-4">
                            ৳{Number(item.price || 0).toLocaleString("en-BD")}
                          </td>

                          {/* Total */}
                          <td className="whitespace-nowrap px-3 py-3 text-sm font-semibold text-blue-600 sm:px-4">
                            ৳
                            {(
                              Number(item.price || 0) *
                              Number(item.quantity || 0)
                            ).toLocaleString("en-BD")}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-8 text-center text-sm text-gray-400"
                        >
                          No products found for this order.
                        </td>
                      </tr>
                    )}
                  </tbody>

                  {/* ORDER SUMMARY */}
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td
                        colSpan={5}
                        className="px-3 py-3 text-right text-sm font-medium text-gray-700 sm:px-4"
                      >
                        Subtotal:
                      </td>
                      <td
                        colSpan={2}
                        className="whitespace-nowrap px-3 py-3 text-sm font-semibold text-gray-900 sm:px-4"
                      >
                        ৳
                        {Number(order?.subTotalPrice || 0).toLocaleString(
                          "en-BD",
                        )}
                      </td>
                    </tr>

                    {Number(order?.couponRef?.discount ?? 0) > 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-3 py-3 text-right text-sm font-medium text-green-600 sm:px-4"
                        >
                          Discount ({order?.couponRef?.code}):
                        </td>
                        <td
                          colSpan={2}
                          className="whitespace-nowrap px-3 py-3 text-sm font-semibold text-green-600 sm:px-4"
                        >
                          -৳
                          {Number(
                            order?.couponRef?.discount || 0,
                          ).toLocaleString("en-BD")}
                        </td>
                      </tr>
                    )}

                    {Number(order?.discount ?? 0) > 0 && !order?.couponRef && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-3 py-3 text-right text-sm font-medium text-green-600 sm:px-4"
                        >
                          Discount:
                        </td>
                        <td
                          colSpan={2}
                          className="whitespace-nowrap px-3 py-3 text-sm font-semibold text-green-600 sm:px-4"
                        >
                          -৳
                          {Number(order?.discount || 0).toLocaleString("en-BD")}
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td
                        colSpan={5}
                        className="px-3 py-3 text-right text-sm font-medium text-gray-700 sm:px-4"
                      >
                        Shipping:
                      </td>
                      <td
                        colSpan={2}
                        className="whitespace-nowrap px-3 py-3 text-sm font-semibold text-gray-900 sm:px-4"
                      >
                        ৳
                        {Number(order?.shippingCost || 0).toLocaleString(
                          "en-BD",
                        )}
                      </td>
                    </tr>

                    <tr className="border-t-2 border-gray-200 bg-blue-50/50">
                      <td
                        colSpan={5}
                        className="px-3 py-3 text-right text-sm font-bold text-gray-900 sm:px-4"
                      >
                        Total:
                      </td>
                      <td
                        colSpan={2}
                        className="whitespace-nowrap px-3 py-3 text-sm font-bold text-blue-600 sm:px-4"
                      >
                        ৳
                        {Number(order?.totalPrice || 0).toLocaleString("en-BD")}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Mobile scroll hint */}
              <div className="border-t border-gray-100 px-3 py-2 text-[11px] text-gray-400 sm:hidden">
                <span className="inline-flex items-center gap-1">
                  Swipe horizontally to view all product details
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-700">
                    Order Timeline
                  </h3>
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Order Created</p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.createdAt
                      ? format(
                          new Date(order.createdAt),
                          "dd MMM yyyy, hh:mm a",
                        )
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.updatedAt
                      ? format(
                          new Date(order.updatedAt),
                          "dd MMM yyyy, hh:mm a",
                        )
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="text-sm font-medium text-gray-900">
                    {order?.orderId || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ViewOrder;
