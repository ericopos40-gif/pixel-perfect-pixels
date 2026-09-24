import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TrendPoint } from "@/lib/demo/types";

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-card)",
  fontSize: 12,
  color: "var(--color-heading)",
};

export function TrendLineChart({
  data,
  series,
  height = 260,
}: {
  data: TrendPoint[];
  series: { key: string; label: string; color: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="label" {...axis} />
        <YAxis {...axis} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        {series.map((item) => (
          <Line
            key={item.key}
            type="monotone"
            dataKey={item.key}
            name={item.label}
            stroke={item.color}
            strokeWidth={2.5}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function GroupedBarChart({
  data,
  series,
  height = 260,
}: {
  data: TrendPoint[];
  series: { key: string; label: string; color: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="label" {...axis} />
        <YAxis {...axis} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-secondary)" }} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        {series.map((item) => (
          <Bar key={item.key} dataKey={item.key} name={item.label} fill={item.color} radius={[6, 6, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({
  data,
  height = 240,
}: {
  data: { name: string; share: number; tone: string }[];
  height?: number;
}) {
  return (
    <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} dataKey="share" nameKey="name" innerRadius="58%" outerRadius="85%" paddingAngle={2}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.tone} stroke="var(--color-card)" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="space-y-2">
        {data.map((entry) => (
          <li key={entry.name} className="flex items-center gap-2 text-sm">
            <span className="size-2.5 rounded-full" style={{ background: entry.tone }} />
            <span className="flex-1 truncate text-muted-foreground">{entry.name}</span>
            <span className="font-semibold text-heading">{entry.share}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
