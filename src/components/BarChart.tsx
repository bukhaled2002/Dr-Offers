import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ClicksResponse } from "@/hooks/useStats";

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

// Helper: get last 7 days with date, label, full
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

export default function ChartBarClick({ days }: { days?: ClicksResponse }) {
  const last7Days = getLast7DaysData();

  // Transform API dailyData into our chart data
  const transformedDays = last7Days.map((day) => {
    const found = days?.dailyData.find(
      (item) => item.date === day.date // match by YYYY-MM-DD
    );
    return {
      label: day.label,
      full: day.full,
      clicks: found ? found.clicks : 0,
    };
  });

  const [selectedDay, setSelectedDay] = useState(
    transformedDays[transformedDays.length - 1].label
  );

  const chartData = transformedDays.map((day) => ({
    day: day.label,
    clicks: day.clicks,
  }));

  return (
    <Card className="bg-white border-none shadow-none w-full p-4">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CardTitle>Clicks</CardTitle>
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent>
            {transformedDays.map((day) => (
              <SelectItem key={day.label} value={day.label}>
                {day.full}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
