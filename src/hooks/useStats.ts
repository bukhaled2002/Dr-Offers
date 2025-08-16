import instance from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export interface AnalyticsData {
  views: number | undefined;
  clicks: number | undefined;
  products: number | undefined;
  users: number | undefined;
}

export interface HourlyView {
  time: string | undefined;
  value: number | undefined;
}

export interface ViewsData {
  [day: string]: HourlyView[];
}

export interface ClickItem {
  date: string; // "2025-08-16"
  displayDate: string; // "Aug 16, 2025"
  weekday: string; // "Saturday"
  clicks: number; // 5
}

export interface ClicksResponse {
  summary: {
    totalClicks: number;
    totalDays: number;
    averagePerDay: number;
    dateRange: {
      from: string;
      to: string;
    };
  };
  weekdays: {
    name: string;
    shortName: string;
    totalClicks: number;
    dates: ClickItem[];
  }[];
  dailyData: ClickItem[];
}
export function useStats(brandId: number) {
  // Analytics
  const analyticsQuery = useQuery<AnalyticsData, Error>({
    queryKey: ["stats", "analytics", brandId],
    queryFn: async () => {
      const res = await instance.get(`/brands/${brandId}/analytics`);
      return res.data.data;
    },
  });

  // Views
  const viewsQuery = useQuery<ViewsData, Error>({
    queryKey: ["stats", "views", brandId],
    queryFn: async () => {
      const res = await instance.get(`/brands/${brandId}/views/hourly`);
      return res.data.data;
    },
  });

  // Clicks
  const clicksQuery = useQuery<ClicksResponse, Error>({
    queryKey: ["stats", "clicks", brandId],
    queryFn: async () => {
      const res = await instance.get(`/brands/${brandId}/clicks/daily`);
      return res.data.data;
    },
  });

  return {
    analytics: analyticsQuery.data,
    analyticsError: analyticsQuery.error,
    analyticsLoading: analyticsQuery.isLoading,

    views: viewsQuery.data,
    viewsError: viewsQuery.error,
    viewsLoading: viewsQuery.isLoading,

    clicks: clicksQuery.data,
    clicksError: clicksQuery.error,
    clicksLoading: clicksQuery.isLoading,
  };
}
