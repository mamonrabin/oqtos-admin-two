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
import { TrendingUp, Eye } from "lucide-react";
import React from "react";
import { TOrderStats } from "@/types";

interface orderProps {
  orderData: TOrderStats;
}

const RevenueNCategory: React.FC<orderProps> = ({ orderData }) => {
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

  const revenueData = React.useMemo(() => {
    const today = new Date();

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));

      const dateString = date.toISOString().split("T")[0];

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

  const formatCurrency = (amount: number) => `৳${amount.toLocaleString()}`;

 

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Revenue Overview
            </h3>
            <p className="text-xs text-gray-400">Weekly revenue & orders</p>
          </div>
          <button className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
            <Eye size={14} />
            View Details
          </button>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                }}
                // use broad any types to satisfy recharts Tooltip formatter signature
                formatter={(value: any, name: any) => {
                  const valNum = Number(value ?? 0);
                  if (String(name) === "revenue")
                    return [`${formatCurrency(valNum)}`, "Revenue"];
                  return [valNum, "Orders"];
                }}
              />
              <Bar
                dataKey="revenue"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                name="Revenue"
              />
              <Bar
                dataKey="orders"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
                name="Orders"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-blue-500" />
              <span className="text-xs text-gray-500">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-purple-500" />
              <span className="text-xs text-gray-500">Orders</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingUp size={14} />
            <span className="font-medium">+12.5%</span>
            <span className="text-gray-400">vs last week</span>
          </div>
        </div>
      </div>

      {/* Category Distribution Pie Chart */}
      <div className="bg-white rounded-xl border border-gray-200 py-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4 px-5">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Category Distribution
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {orderData?.totalOrder} Total
          </span>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderData?.totalOrderByCategory ?? []}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="totalOrders"
                nameKey="categoryName"
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {(orderData?.totalOrderByCategory ?? []).map(
                  (_: any, index: number) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ),
                )}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                }}
                formatter={(value: any) => [`${value ?? 0} order`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-3 pt-2 border-t border-gray-100">
          {orderData?.totalOrderByCategory.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full`}
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-xs text-gray-600">{item.categoryName}</span>
              <span className="text-xs font-medium text-gray-900">
                ({item.totalOrders})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueNCategory;
