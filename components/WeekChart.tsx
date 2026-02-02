// components/WeekChart.tsx
"use client";

import {
  LineChart,
  Line,
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
  day: string;
  value: number | null;
};

const DAY_LABELS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function WeekChart({
  days,
}: {
  days: (DayLog | null)[];
}) {
  const data: ChartRow[] = days.map((d, i) => ({
    day: DAY_LABELS[i].slice(0, 2),
    value: d?.microAvg ?? null,
  }));

const tooltipFormatter: TooltipProps<number, string>["formatter"] = (value) => [
  `${value}%`,
  "Micros",
];

  return (
    <div style={{ width: 220, height: 96 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
        >
          <XAxis
            dataKey="day"
            tick={(props: any) => {
              const { x, y, payload } = props;
              const index = payload.index as number;
              const isWeekend = index >= 5;

              return (
                <text
                  x={x}
                  y={y + 10}
                  textAnchor="middle"
                  fontSize={10}
                  fill={isWeekend ? "var(--accent)" : "currentColor"}
                >
                  {payload.value}
                </text>
              );
            }}
          />

          <YAxis
            domain={[0, 100]}
            tickFormatter={(v: number, index: number) => `${v}%`}
            tick={{ fontSize: 10 }}
            width={40}
          />

          <Tooltip
            formatter={tooltipFormatter}
            labelFormatter={(label) => `Day ${DAY_LABELS[data.findIndex(d => d.day === label)]}`}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--accent)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 4 }}
            connectNulls={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
