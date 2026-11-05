/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, Eye } from "lucide-react";
import React from "react";
import { TOrderStats } from "@/types";

interface OrderProps {
  orderData: TOrderStats;
}

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#06b6d4",
  "#f472b6",
];

const formatCurrency = (amount: number) =>
  `৳${amount.toLocaleString("en-BD")}`;

const RevenueNCategory: React.FC<OrderProps> = ({ orderData }) => {
  const revenueData = React.useMemo(() => {
    const today = new Date();

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      const existing = orderData?.orderChart?.find(
        (item: any) => item._id === dateString,
      );

      return {
        name: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        revenue: existing?.revenue ?? 0,
        orders: existing?.orders ?? 0,
      };
    });
  }, [orderData]);

  const categoryData = orderData?.totalOrderByCategory ?? [];

  const totalRevenue = revenueData.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );

  const totalOrders = revenueData.reduce(
    (sum, item) => sum + item.orders,
    0,
  );

  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
      {/* Revenue Chart */}
      <div className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:p-5">
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-700 sm:text-base">
              Revenue Overview
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              Weekly revenue & orders
            </p>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-blue-600 transition-colors hover:text-blue-800"
          >
            <Eye size={14} />
            View Details
          </button>
        </div>

        {/* Chart */}
        <div className="w-full overflow-x-auto">
          <div className="h-56 min-w-[320px] sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{
                  top: 10,
                  right: 5,
                  left: -20,
                  bottom: 0,
                }}
                barGap={3}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  stroke="#888"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />

                <YAxis
                  stroke="#888"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    value >= 1000
                      ? `${(value / 1000).toFixed(0)}k`
                      : String(value)
                  }
                />

                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.08)",
                  }}
                  formatter={(value: any, name: any) => {
                    const amount = Number(value ?? 0);

                    if (name === "Revenue") {
                      return [formatCurrency(amount), "Revenue"];
                    }

                    return [amount, "Orders"];
                  }}
                />

                <Bar
                  dataKey="revenue"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="Revenue"
                  maxBarSize={28}
                />

                <Bar
                  dataKey="orders"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  name="Orders"
                  maxBarSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-blue-500" />
              <span className="text-xs text-gray-500">Revenue</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-purple-500" />
              <span className="text-xs text-gray-500">Orders</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-gray-700">
              {formatCurrency(totalRevenue)}
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              {totalOrders} orders
            </span>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white py-4 shadow-sm transition-shadow hover:shadow-md sm:py-5">
        {/* Header */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-5">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 sm:text-base">
              Category Distribution
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              Orders by category
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            {orderData?.totalOrder ?? 0} Total
          </span>
        </div>

        {/* Pie Chart */}
        <div className="h-52 w-full sm:h-60">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius="45%"
                  outerRadius="75%"
                  paddingAngle={2}
                  dataKey="totalOrders"
                  nameKey="categoryName"
                  stroke="none"
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.08)",
                  }}
                  formatter={(value: any) => [
                    `${value ?? 0} orders`,
                    "Orders",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No category data available
            </div>
          )}
        </div>

        {/* Category Legend */}
        <div className="mx-3 mt-3 border-t border-gray-100 pt-3 sm:mx-5">
          <div className="flex flex-wrap justify-center gap-2">
            {categoryData.map((item, index) => {
              const total = categoryData.reduce(
                (sum, category) => sum + category.totalOrders,
                0,
              );

              const percentage = total
                ? ((item.totalOrders / total) * 100).toFixed(0)
                : "0";

              return (
                <div
                  key={index}
                  className="flex max-w-full items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1.5 transition-colors hover:bg-gray-100"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  <span className="max-w-[110px] truncate text-xs text-gray-600 sm:max-w-[150px]">
                    {item.categoryName}
                  </span>

                  <span className="shrink-0 text-xs font-semibold text-gray-900">
                    {percentage}%
                  </span>

                  <span className="shrink-0 text-[10px] text-gray-400">
                    ({item.totalOrders})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueNCategory;