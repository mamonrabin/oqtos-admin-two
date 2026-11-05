
import {
  DollarSign,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

interface DashboardStatsProps {
  statsData: {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalUsers: number;
  };
}

const DashboardStats = ({ statsData }: DashboardStatsProps) => {
  const stats = [
    {
      title: "Total Revenue",
      value: statsData?.totalRevenue ?? 0,
      icon: DollarSign,
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: statsData?.totalOrders ?? 0,
      icon: ShoppingBag,
      color: "bg-green-500",
    },
    {
      title: "Total Products",
      value: statsData?.totalProducts ?? 0,
      icon: Package,
      color: "bg-purple-500",
    },
    {
      title: "Total Users",
      value: statsData?.totalUsers ?? 0,
      icon: Users,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-4 gap-2 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 md:p-5 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {stat.title}
                </p>
                <p className="md:text-2xl text-base font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>

              <div className={`${stat.color} md:p-2.5 p-1.5 rounded-lg`}>
                <Icon size={18} className="text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;