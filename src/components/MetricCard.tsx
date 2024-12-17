import React from 'react';
import { Card } from './ui/Card';
import { MetricChart } from './MetricChart';
import { TimeSeriesData } from '../types/metrics';

interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  description: string;
  history: TimeSeriesData[];
  color?: string;
}

export function MetricCard({
  title,
  value,
  unit,
  description,
  history,
  color,
}: MetricCardProps) {
  return (
    <Card className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900">
            {value.toFixed(2)}
            {unit && <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>}
          </p>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        <MetricChart data={history} color={color} />
      </div>
    </Card>
  );
}