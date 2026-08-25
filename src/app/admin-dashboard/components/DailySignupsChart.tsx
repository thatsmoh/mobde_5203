'use client';
import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  data: { date: string; count: number }[];
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-lg px-3 py-2 product-preview-shadow text-xs">
      <div className="font-600 text-foreground">{label}</div>
      <div className="text-muted-foreground mt-0.5">
        <span className="text-foreground font-700 tabular-nums">{payload[0].value}</span> signups
      </div>
    </div>
  );
}

export default function DailySignupsChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
        <defs>
          <linearGradient id="sigGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="count"
          stroke="var(--primary)"
          strokeWidth={2}
          fill="url(#sigGrad)"
          dot={{ fill: 'var(--primary)', strokeWidth: 0, r: 3 }}
          activeDot={{ r: 4, fill: 'var(--primary)' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}