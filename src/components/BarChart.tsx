import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { ClicksResponse } from "@/hooks/useStats";
import { useTranslation } from "react-i18next";

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

// Helper: get last 7 days with date, label, full (logic in English)
function getLast7DaysData() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      date: d.toISOString().split("T")[0], // "YYYY-MM-DD"
      label: d.toLocaleDateString("en-US", { weekday: "short" }), // Mon
      full: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), // Aug 14
    });
  }
  return days;
}

// Translate label for UI only
function translateDayLabel(
  label: string,
  t: (key: string) => string,
  isRTL: boolean
) {
  if (!isRTL) return label;
  const dayMap: Record<string, string> = {
    Mon: t("chart.mon"),
    Tue: t("chart.tue"),
    Wed: t("chart.wed"),
    Thu: t("chart.thu"),
    Fri: t("chart.fri"),
    Sat: t("chart.sat"),
    Sun: t("chart.sun"),
  };
  return dayMap[label] || label;
}

export default function ChartBarClick({ days }: { days?: ClicksResponse }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const last7Days = getLast7DaysData();

  // Transform API dailyData into chart data (logic still in English)
  const transformedDays = last7Days.map((day) => {
    const found = days?.dailyData.find((item) => item.date === day.date);
    return {
      label: day.label,
      full: day.full,
      clicks: found ? found.clicks : 0,
    };
  });

  const chartData = transformedDays.map((day) => ({
    day: translateDayLabel(day.label, t, isRTL),
    clicks: day.clicks,
  }));

  return (
    <Card
      className="bg-white border-none shadow-none w-full p-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CardTitle>{t("chart.clicks")}</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="clicks" fill="var(--primary)" radius={6}></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
