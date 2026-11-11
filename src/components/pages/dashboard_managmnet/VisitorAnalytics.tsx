"use client";

import {
  Users,
  Eye,
  Activity,
  UserRoundCheck,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useVisitorStats } from "@/hooks/visitor.hook";

export default function VisitorAnalytics() {
  const { data, isLoading, isError } = useVisitorStats();

  if (isLoading) {
    return <div>Loading visitor statistics...</div>;
  }

  if (isError || !data) {
    return <div>Unable to load visitor statistics.</div>;
  }

  const cards = [
    {
      title: "Total Visitors",
      value: data.totalVisitors,
      icon: Users,
    },
    {
      title: "Today's Visitors",
      value: data.todayVisitors,
      icon: UserRoundCheck,
    },
    {
      title: "Total Page Views",
      value: data.totalPageViews,
      icon: Eye,
    },
    {
      title: "Live Visitors",
      value: data.liveVisitors,
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Statistics cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">

                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <Icon className="size-5 text-gray-500" />
              </div>

              <h2 className="mt-3 text-2xl font-bold">
                {card.value.toLocaleString()}
              </h2>
            </div>
          );
        })}

      </div>

      {/* Daily visitors chart */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">

        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Website Traffic
          </h2>

          <p className="text-sm text-gray-500">
            Visitors and page views over the last 7 days
          </p>
        </div>

        <div className="h-[320px] w-full">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={data.dailyStats}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#087096"
                fill="#087096"
                fillOpacity={0.12}
                name="Visitors"
              />

              <Area
                type="monotone"
                dataKey="pageViews"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.08}
                name="Page Views"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}