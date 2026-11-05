
"use client";

import { TProductStats } from "@/types";
import {
  Package,
  PieChartIcon,
  DollarSign,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color,
}: StatsCardProps) => (
  <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4 lg:p-5">
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-gray-500 sm:text-sm">
          {title}
        </p>
        <p className="mt-2 break-words text-sm font-bold text-gray-900 sm:text-base lg:text-lg">
          {value}
        </p>
      </div>

      <div className={`${color} shrink-0 rounded-lg p-2`}>
        <Icon size={15} className="text-white" />
      </div>
    </div>
  </div>
);

const formatCurrency = (amount: number) =>
  `৳${amount.toLocaleString("en-BD")}`;

interface ProductDataProps {
  productData: TProductStats;
}

const TopSellingProducts: React.FC<ProductDataProps> = ({
  productData,
}) => {
  const highestOrderProduct =
    productData?.totalHighestOrderProduct ?? [];

  const inventory = productData?.inventoryValueStats?.[0];

  return (
    <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-3">
      {/* TOP SELLING PRODUCTS */}
      <div className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-700 sm:text-base">
              Top Selling Products
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              Most ordered products
            </p>
          </div>

          <Link
            href="/top_sell"
            className="shrink-0 text-xs font-medium text-blue-600 hover:text-blue-800"
          >
            View All
          </Link>
        </div>

        {/* RESPONSIVE TABLE */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[620px] text-left">
            <thead className="bg-gray-50">
              <tr>
                {["#", "Product", "Sold", "Orders", "Revenue"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {highestOrderProduct.slice(0, 5).map((p, i) => (
                <tr
                  key={i}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-500">
                    {i + 1}
                  </td>

                  <td className="max-w-[220px] px-4 py-3">
                    <p
                      title={p.name}
                      className="truncate text-sm font-medium text-gray-900"
                    >
                      {p.name}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                    {p.totalSold}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                      {p.totalOrders} orders
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-green-600">
                    {formatCurrency(p.revenue)}
                  </td>
                </tr>
              ))}

              {highestOrderProduct.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-sm text-gray-400"
                  >
                    No selling products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INVENTORY STATS */}
      <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 lg:content-start">
        <StatsCard
          title="Total Products"
          value={inventory?.totalProducts ?? 0}
          icon={Package}
          color="bg-purple-500"
        />

        <StatsCard
          title="Total Stock"
          value={inventory?.totalStock ?? 0}
          icon={PieChartIcon}
          color="bg-green-500"
        />

        <StatsCard
          title="MRP Value"
          value={formatCurrency(inventory?.totalMRPValue ?? 0)}
          icon={DollarSign}
          color="bg-orange-500"
        />

        <StatsCard
          title="Selling Value"
          value={formatCurrency(inventory?.totalSellingValue ?? 0)}
          icon={DollarSign}
          color="bg-blue-500"
        />

        <div className="col-span-2">
          <StatsCard
            title="Discount Value"
            value={formatCurrency(inventory?.totalDiscountValue ?? 0)}
            icon={DollarSign}
            color="bg-cyan-500"
          />
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;
