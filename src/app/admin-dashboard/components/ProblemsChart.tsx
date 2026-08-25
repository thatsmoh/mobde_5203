'use client';
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

interface Props {
  data: { problem: string; count: number }[];
}

const SHORT_LABELS: Record<string, string> = {
  'Customers forget to renew': 'Forget renew',
  'Manual payment verification': 'Manual verify',
  'Manual access management': 'Manual access',
  'No subscription offering': 'No sub offer',
  'Managing subscribers': 'Sub mgmt',
  'Local payment methods': 'Local pay',
  'Payment fees': 'Fees',
  'International payments': 'Intl pay',
};

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: { problem: string; count: number } }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-border rounded-lg px-3 py-2 product-preview-shadow text-xs">
      <div className="font-600 text-foreground">{d.problem}</div>
      <div className="text-muted-foreground mt-0.5">
        <span className="text-foreground font-700 tabular-nums">{d.count}</span> responses
      </div>
    </div>
  );
}

export default function ProblemsChart({ data }: Props) {
  const chartData = data.map((d) => ({ ...d, short: SHORT_LABELS[d.problem] ?? d.problem }));

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 0, right: 8, left: 4, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <YAxis
          type="category"
          dataKey="short"
          width={72}
          tick={{ fontSize: 9, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[0, 3, 3, 0]} maxBarSize={14}>
          {chartData.map((entry, index) => (
            <Cell
              key={`prob-cell-${index}`}
              fill={index < 3 ? 'var(--primary)' : 'var(--muted)'}
              stroke={index < 3 ? 'var(--primary)' : 'var(--border)'}
              strokeWidth={1}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}