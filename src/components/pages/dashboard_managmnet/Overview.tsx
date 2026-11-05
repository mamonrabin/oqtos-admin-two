"use client"
import { Calendar, Download } from "lucide-react";
import React, { useState } from "react";
import DashboardStats from "./DashboardStats";
import { useAllDashboardStats, useAllOrdersStats, useAllProductsStats, useAllUserStats } from "@/hooks/stats.hook";
import OrderStats from "./OrderStats";
import RevenueNCategory from "./RevenueNCategory";
import StatusNStockAlert from "./StatusNStockAlert";
import SatisfactionNLocation from "./SatisfactionNLocation";
import { useAllReviews } from "@/hooks/review.hook";
import TopSellingProducts from "./TopSellingProducts";
import RecenteOrder from "./RecenteOrder";
import { useAllOrders } from "@/hooks/order.hook";
import DaySelector from "./DaySelector";

const Overview = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [limit, setLimit] = useState(5);
  
    const { data: reviewList} = useAllReviews(page, limit);
    
    const reviews = reviewList?.data;

    
    //   const [paymentMethod, setPaymentMethod] = useState<string>();
    //   const [paymentStatus, setPaymentStatus] = useState<string>();
    //   const [status, setStatus] = useState<string>();
    //   const [dateFilter, setDateFilter] = useState<string>();
    
      const { data: orderList } = useAllOrders({
        page,
        limit,
      });
      const orders = orderList?.data?.data;

    const {data:dashboardStats} = useAllDashboardStats()
    const {data:ordersStats} = useAllOrdersStats()
    const {data:userStats} = useAllUserStats()
    const {data:productStats} = useAllProductsStats()
    const statsData = dashboardStats?.data
    const orderData = ordersStats?.data
    const userData = userStats?.data
    const productData = productStats?.data
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <p className="text-sm text-gray-500">
            Welcome back! Here s what s happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-3 sm:mt-0">
          <DaySelector/>
          {/* <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md">
            <Download size={16} />
            Export
          </button> */}
        </div>
      </div>

      <DashboardStats statsData={statsData}/>
      <OrderStats orderData={orderData} userData={userData}/>
      <RevenueNCategory orderData={orderData}/>

      <StatusNStockAlert userData={userData} orderData={orderData} lowStockAlert={productData?.lowStockAlerts}/>
      <SatisfactionNLocation reviews={reviews} cityStats={orderData?.cityStats} returnStats={orderData?.returnStats}/>
      <TopSellingProducts productData={productData}/>
      <RecenteOrder orders={orders}/>
    </div>
  );
};

export default Overview;
