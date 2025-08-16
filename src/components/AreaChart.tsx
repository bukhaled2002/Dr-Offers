import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { ViewsData, HourlyView } from "@/hooks/useStats";

// Format hour like "03am", "12pm"
const formatHourLabel = (hour: number) => {
  const suffix = hour < 12 ? "am" : "pm";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return h.toString().padStart(2, "0") + suffix;
};

// Generate hourly data for a day (0-23 hours)
const getHourlyDataForDay = (data: HourlyView[] | undefined): HourlyView[] => {
  return Array.from({ length: 24 }, (_, i) => {
    const hourLabel = formatHourLabel(i);
    const found = data?.find((h) => h.time === hourLabel);
    return found ?? { time: hourLabel, value: 0 };
  });
};

// Generate labels for last 24 hours
const getLast24HourLabels = (): string[] => {
  const now = new Date();
  const labels: string[] = [];
  for (let i = 23; i >= 0; i--) {
    const d = new Date(now);
    d.setHours(now.getHours() - i);
    labels.push(formatHourLabel(d.getHours()));
  }
  return labels;
};

// Merge weekData into rolling last 24 hours
const getLast24HourData = (
  weekData: ViewsData,
  todayLabel: string
): HourlyView[] => {
  const labels = getLast24HourLabels();
  return labels.map((label) => {
    // Try to find in today
    let found = weekData[todayLabel]?.find((h) => h.time === label);

    // If not found, try yesterday
    if (!found) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayLabel = yesterday.toLocaleDateString("en-US", {
        weekday: "short",
      });
      found = weekData[yesterdayLabel]?.find((h) => h.time === label);
    }

    return found ?? { time: label, value: 0 };
  });
};

// Get last 7 days
const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      full: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      date: d.toDateString(),
    });
  }
  return days;
};

interface ViewsChartProps {
  views?: ViewsData;
}

export default function ViewsChart({ views: weekData = {} }: ViewsChartProps) {
  const days = getLast7Days();
  const [selectedDay, setSelectedDay] = useState(days[6].label);

  const selectedDayObj = days.find((d) => d.label === selectedDay);
  const isToday = selectedDayObj?.date === new Date().toDateString();

  const chartData = isToday
    ? getLast24HourData(weekData, selectedDay)
    : getHourlyDataForDay(weekData[selectedDay]);

  return (
    <Card className="bg-white border-none shadow-none w-full p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Views</CardTitle>

          {/* Day selector */}
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              {days.map((day) => (
                <SelectItem key={day.label} value={day.label}>
                  {day.full}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div style={{ width: "100%", height: 200 }}>
          <ResponsiveContainer>
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--primary)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="time"
                className="text-xs"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis axisLine={false} tickLine={false} tickMargin={10} />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#1a1a1a] text-white px-3 py-2 rounded-lg shadow-md text-center">
                        <div className="text-sm">View</div>
                        <div className="text-lg font-bold">
                          {payload[0].value}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
                cursor={{ strokeDasharray: "3 3", stroke: "var(--primary)" }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={3}
                fill="url(#colorView)"
                dot={{
                  r: 4,
                  fill: "#fff",
                  stroke: "var(--primary)",
                  strokeWidth: 2,
                }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
