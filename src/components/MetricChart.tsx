import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TimeSeriesData } from '../types/metrics';

interface MetricChartProps {
  data: TimeSeriesData[];
  color?: string;
}

export function MetricChart({ data, color = '#3b82f6' }: MetricChartProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatValue = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <div className="h-32 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 10 }}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatDate}
            interval="preserveStartEnd"
            minTickGap={30}
            tick={{ fontSize: 10 }}
          />
          <YAxis 
            tickFormatter={formatValue}
            width={40}
            tick={{ fontSize: 10 }}
            domain={['auto', 'auto']}
          />
          <Tooltip
            labelFormatter={formatDate}
            formatter={(value: number) => [value.toFixed(3)]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
