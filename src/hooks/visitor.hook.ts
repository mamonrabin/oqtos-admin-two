"use client";

import { AxiosInstance } from "@/lib/AxiosInstance";
import { useQuery } from "@tanstack/react-query";


export interface VisitorStats {
  totalVisitors: number;
  totalPageViews: number;
  todayVisitors: number;
  todayPageViews: number;
  liveVisitors: number;
  dailyStats: {
    date: string;
    visitors: number;
    pageViews: number;
  }[];
}

export const useVisitorStats = () => {
  return useQuery<VisitorStats>({
    queryKey: ["visitor-stats"],

    queryFn: async () => {
      const { data } = await AxiosInstance.get(
        "/visitor/stats",
      );

      return data.data;
    },

    refetchInterval: 15_000,
    staleTime: 10_000,
  });
};