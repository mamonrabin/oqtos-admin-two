"use client";
import { TLowStockAlert, TOrderStats, TUserStats } from "@/types";
import Link from "next/link";
import React from "react";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Order Status Data

// Low Stock Alerts Data


interface StatusNStockAlertProps {
  userData: TUserStats;
  orderData: TOrderStats;
  lowStockAlert: TLowStockAlert[];
}

const StatusNStockAlert: React.FC<StatusNStockAlertProps> = ({
  userData,
  orderData,
  lowStockAlert,
}) => {
  const userStatusData = [
    {
      name: "Active Users",
      value: userData?.totalActiveUsers ?? 0,
      color: "#10b981",
    },
    {
      name: "Inactive Users",
      value: userData?.totalInActiveUsers ?? 0,
      color: "#f59e0b",
    },
    {
      name: "Blocked Users",
      value: userData?.totalBlockedUsers ?? 0,
      color: "#ef4444",
    },
  ];



  // Order Status Data

  const statusColors: Record<string, string> = {
    DELIVERED: "#10b981",
    PROCESSING: "#3b82f6",
    SHIPPED: "#8b5cf6",
    PENDING: "#f59e0b",
    CONFIRMED: "#06b6d4",
    CANCELLED: "#ef4444",
    ON_HOLD: "#e11d48",
    IN_REVIEW: "#6366f1",
    RETURNED: "#f97316",
  };

  const totalOrders = orderData?.totalOrder || 0;

  const orderStatuses =
    orderData?.orderStatus
      ?.filter((item) => item.orders > 0) // Don't show 0 orders
      .map((item) => ({
        status: item._id,
        count: item.orders,
        percentage:
          totalOrders > 0
            ? Number(((item.orders / totalOrders) * 100).toFixed(1))
            : 0,
        color: statusColors[item._id] || "#9ca3af",
      })) || [];

  const criticalCount =
    lowStockAlert?.filter((item) => item.alertType === "CRITICAL").length || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-6">
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          User Status
        </h3>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={userStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {userStatusData.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value: unknown) => [
                  typeof value === "number" ? value.toLocaleString() : String(value ?? ""),
                  "Users",
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {userStatusData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600">{item.name}</span>
              <span className="text-xs font-semibold text-gray-900">
                ({item.value.toLocaleString()})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Order Status
            </h3>
            <p className="text-xs text-gray-400">Current order distribution</p>
          </div>
        </div>
        <div className="space-y-3">
          {orderStatuses.map((item) => (
            <div key={item.status}>
              <div className="flex items-center justify-between text-sm mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">{item.status}</span>
                </div>

                <span className="font-medium text-gray-900">{item.count}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Low Stock Alerts
            </h3>
            <p className="text-xs text-gray-400">Items needing restock</p>
          </div>

         <Link href="/stock_alerts">
          <span className="bg-gray-200 hover:bg-[#155DFC] hover:text-white duration-300 cursor-pointer text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
            view more
          </span>
         </Link>
        </div>

        <div className="space-y-3">
          {lowStockAlert?.length ? (
            lowStockAlert?.slice(0,5).map((item: TLowStockAlert) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-400">
                    Available: {item.availableQuantity} / {item.quantity}
                  </p>
                </div>

                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    item.alertType === "CRITICAL"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.alertType}
                </span>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-sm text-gray-500">
              No low stock alerts 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusNStockAlert;
