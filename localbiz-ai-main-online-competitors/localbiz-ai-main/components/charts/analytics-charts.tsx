"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"

const axisTick = { fontSize: 12, fill: "var(--muted-foreground)" }

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--popover)",
  color: "var(--popover-foreground)",
  fontSize: 12,
  boxShadow: "0 8px 24px rgb(0 0 0 / 0.08)",
}

export function EngagementChart({
  data,
}: {
  data: { day: string; views: number; enquiries: number }[]
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fillEnquiries" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={axisTick} />
          <YAxis tickLine={false} axisLine={false} tick={axisTick} width={40} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey="views"
            name="Views"
            stroke="var(--chart-1)"
            strokeWidth={2}
            fill="url(#fillViews)"
          />
          <Area
            type="monotone"
            dataKey="enquiries"
            name="Enquiries"
            stroke="var(--chart-2)"
            strokeWidth={2}
            fill="url(#fillEnquiries)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-4)"]

export function ChannelChart({ data }: { data: { channel: string; value: number }[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="channel"
            innerRadius={58}
            outerRadius={90}
            paddingAngle={3}
            stroke="var(--card)"
            strokeWidth={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ProductPerformanceChart({
  data,
}: {
  data: { name: string; views: number; conversions: number }[]
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={axisTick} interval={0} />
          <YAxis tickLine={false} axisLine={false} tick={axisTick} width={40} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }} />
          <Bar dataKey="views" name="Views" fill="var(--chart-1)" fillOpacity={0.35} radius={[6, 6, 0, 0]} maxBarSize={40} />
          <Bar dataKey="conversions" name="Conversions" fill="var(--primary)" radius={[6, 6, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
