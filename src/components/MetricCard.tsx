import React from 'react';

export interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  description?: string;
  history?: number[];
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  unit, 
  description = '', 
  history = [] 
}) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 truncate">
              {title}
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {value.toFixed(2)}{unit}
            </p>
          </div>
        </div>
        {description && (
          <p className="mt-2 text-sm text-gray-500">
            {description}
          </p>
        )}
        {history.length > 0 && (
          <div className="mt-3 h-16">
            {/* Mini chart could be added here */}
            <div className="text-xs text-gray-500">
              History available: {history.length} points
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
