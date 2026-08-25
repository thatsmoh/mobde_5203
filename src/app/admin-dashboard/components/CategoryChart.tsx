'use client';
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

interface Props {
  data: { category: string; count: number }[];
}

const SHORT_LABELS: Record<string, string> = {
  'YouTube / Content Creator': 'YouTube',
  'Streamer / Gamer': 'Streamer',
  'Podcaster': 'Podcast',
  'Coach / Consultant': 'Coach',
  'Educator / Course Creator': 'Educator',
  'Community Owner': 'Community',
  'Freelancer / Service Provider': 'Freelancer',
  'Digital Product Seller': 'Digital',
  'Small Business': 'Business',
  'Other': 'Other',
};

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: { category: string; count: number } }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-border rounded-lg px-3 py-2 product-preview-shadow text-xs">
      <div className="font-600 text-foreground">{d.category}</div>
      <div className="text-muted-foreground mt-0.5">
        <span className="text-foreground font-700 tabular-nums">{d.count}</span> signups
      </div>
    </div>
  );
}

export default function CategoryChart({ data }: Props) {
  const chartData = data.map((d) => ({ ...d, short: SHORT_LABELS[d.category] ?? d.category }));

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={chartData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="short"
          tick={{ fontSize: 9, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
          interval={0}
          angle={-30}
          textAnchor="end"
          height={36}
        />
        <YAxis
          tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[3, 3, 0, 0]} maxBarSize={28}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cat-cell-${index}`}
              fill={index === 0 ? 'var(--primary)' : 'var(--muted)'}
              stroke={index === 0 ? 'var(--primary)' : 'var(--border)'}
              strokeWidth={1}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}