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
import { useTranslation } from "react-i18next";

// Always English label for internal comparison
const formatHourLabelEn = (hour: number) => {
  const suffix = hour < 12 ? "am" : "pm";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return h.toString().padStart(2, "0") + suffix;
};

// Convert English label to UI based on language
const formatHourLabelUI = (
  label: string,
  t: (key: string) => string,
  isRTL: boolean
) => {
  if (!isRTL) return label;
  const hour = parseInt(label.slice(0, 2), 10);
  const suffix = label.slice(2) === "am" ? t("chart.am") : t("chart.pm");
  return `${hour.toString().padStart(2, "0")}${suffix}`;
};

const getHourlyDataForDay = (data: HourlyView[] | undefined) =>
  Array.from({ length: 24 }, (_, i) => {
    const hourLabel = formatHourLabelEn(i);
    const found = data?.find((h) => h.time === hourLabel);
    return found ?? { time: hourLabel, value: 0 };
  });

const getLast24HourLabels = () =>
  Array.from({ length: 24 }, (_, i) => {
    const now = new Date();
    now.setHours(now.getHours() - (23 - i));
    return formatHourLabelEn(now.getHours());
  });

const getLast24HourData = (weekData: ViewsData, todayLabel: string) => {
  const labels = getLast24HourLabels();
  return labels.map((label) => {
    let found = weekData[todayLabel]?.find((h) => h.time === label);
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

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      full: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      date: d.toDateString(),
    });
  }
  return days;
};

interface ViewsChartProps {
  views?: ViewsData;
}

export default function ViewsChart({ views: weekData = {} }: ViewsChartProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const days = getLast7Days();
  const [selectedDay, setSelectedDay] = useState(days[6].label);
  const selectedDayObj = days.find((d) => d.label === selectedDay);
  const isToday = selectedDayObj?.date === new Date().toDateString();

  const chartData = isToday
    ? getLast24HourData(weekData, selectedDay)
    : getHourlyDataForDay(weekData[selectedDay]);

  return (
    <Card
      className="bg-white border-none shadow-none w-full p-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("chart.views")}</CardTitle>

          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t("chart.selectDay")} />
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
                tickFormatter={(time) => formatHourLabelUI(time, t, isRTL)}
              />
              <YAxis axisLine={false} tickLine={false} tickMargin={10} />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const label = formatHourLabelUI(
                      payload[0].payload.time,
                      t,
                      isRTL
                    );
                    return (
                      <div className="bg-[#1a1a1a] text-white px-3 py-2 rounded-lg shadow-md text-center">
                        <div className="text-sm">{t("chart.view")}</div>
                        <div className="text-lg font-bold">
                          {payload[0].value}
                        </div>
                        <div className="text-xs">{label}</div>
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
