import { TOrderStats, TUserStats } from "@/types";
import { Clock, TrendingUp, UserCheck, UserPlus, Users } from "lucide-react";
import React from "react";

type OrderStatsProps = {
  orderData: TOrderStats;
  userData: TUserStats;
};

const OrderStats: React.FC<OrderStatsProps> = ({ orderData, userData }) => {
  const totalUsers = userData?.totalUsers || 0;
  const activeUsers = userData?.totalActiveUsers || 0;

  const activePercentage =
    totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(0) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Orders Today */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Today Orders</p>
            <p className="text-3xl font-bold mt-1">
              {orderData?.orderToday ?? 0}
            </p>
          </div>

          <div className="bg-white/20 p-3 rounded-lg">
            <Clock size={20} />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <TrendingUp size={14} className="text-green-300" />
          <span className="text-sm text-green-200">
            Last 7 Days: {orderData?.orderLast7Days ?? 0}
          </span>
        </div>
      </div>

      {/* New Users 7 Days */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">
              New Users (7 Days)
            </p>
            <p className="text-3xl font-bold mt-1">
              {userData?.newUsersInLast7Days ?? 0}
            </p>
          </div>

          <div className="bg-white/20 p-3 rounded-lg">
            <UserPlus size={20} />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <TrendingUp size={14} className="text-green-300" />
          <span className="text-sm text-green-200">
            Total Users: {totalUsers}
          </span>
        </div>
      </div>

      {/* Active Users */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Active Users</p>
            <p className="text-3xl font-bold mt-1">{activeUsers}</p>
          </div>

          <div className="bg-white/20 p-3 rounded-lg">
            <UserCheck size={20} />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <TrendingUp size={14} className="text-green-300" />
          <span className="text-sm text-green-200">
            {activePercentage}% of total
          </span>
        </div>
      </div>

      {/* New Users 30 Days */}
      {/* <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm font-medium">
              New Users (30 Days)
            </p>
            <p className="text-3xl font-bold mt-1">
              {userData?.newUsersInLast30Days ?? 0}
            </p>
          </div>

          <div className="bg-white/20 p-3 rounded-lg">
            <Users size={20} />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <TrendingUp size={14} className="text-green-300" />
          <span className="text-sm text-green-200">
            Total Users: {totalUsers}
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default OrderStats;
