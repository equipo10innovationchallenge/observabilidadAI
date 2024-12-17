import React, { useState } from 'react';
import { Card } from './ui/Card';
import { MetricChart } from './MetricChart';
import { TimeSeriesData } from '../types/metrics';
import { Info } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  description: string;
  definition: string;
  history: TimeSeriesData[];
  color?: string;
}

export function MetricCard({
  title,
  value,
  unit,
  description,
  definition,
  history,
  color,
}: MetricCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Card className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="relative">
            <button
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              aria-label={`Information about ${title}`}
            >
              <Info className="w-4 h-4 text-gray-400" />
            </button>
            {showTooltip && (
              <div className="absolute z-10 right-0 mt-2 w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg">
                {definition}
              </div>
            )}
          </div>
        </div>
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
