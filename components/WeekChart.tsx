// components/WeekChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

type DayLog = {
  date: string;
  microAvg: number;
};

type ChartRow = {
  day: number;
  value: number | null;
};

const tooltipFormatter: TooltipProps<number, string>["formatter"] = (
  value
) => [`${value}%`, "Micros"];

export default function WeekChart({
  days,
}: {
  days: (DayLog | null)[];
}) {
  const data: ChartRow[] = days.map((d, i) => ({
    day: i + 1,
    value: d?.microAvg ?? null,
  }));

  return (
    <div style={{ width: 220, height: 64 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="day" hide />
          <YAxis domain={[0, 100]} hide />
          <Tooltip
            formatter={tooltipFormatter}
            labelFormatter={(l) => `Day ${l}`}
          />
          <Bar
            dataKey="value"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
``
