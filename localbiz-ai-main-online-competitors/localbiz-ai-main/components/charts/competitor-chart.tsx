'use client'

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

type Row = { name: string; price: number; you?: boolean }

export function CompetitorChart({
  data,
  recommended,
}: {
  data: Row[]
  recommended: number
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 24, right: 12, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            interval={0}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            tickFormatter={(v) => `₹${v}`}
            width={48}
            domain={[0, 'dataMax + 80']}
          />
          <ReferenceLine
            y={recommended}
            stroke="var(--primary)"
            strokeDasharray="5 4"
            label={{
              value: `Recommended: ₹${recommended}`,
              position: 'insideTopRight',
              fill: 'var(--primary)',
              fontSize: 12,
              fontWeight: 600,
            }}
          />
          <Bar dataKey="price" radius={[8, 8, 0, 0]} maxBarSize={64}>
            <LabelList
              dataKey="price"
              position="top"
              formatter={(v) => `₹${v}`}
              style={{ fontSize: 12, fontWeight: 600, fill: 'var(--foreground)' }}
            />
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.you ? 'var(--primary)' : 'var(--chart-1)'}
                fillOpacity={entry.you ? 1 : 0.35}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
