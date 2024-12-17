import React from 'react';

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  latency?: number;
  throughput?: number;
}

export interface MetricChartProps {
  data: TimeSeriesData[];
  metrics: string[];
}

export const MetricChart: React.FC<MetricChartProps> = ({ data, metrics }) => {
  // In a real application, you would use a charting library like Chart.js or Recharts
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="h-64 flex items-center justify-center">
        <div className="text-gray-500">
          {data.length > 0 ? (
            <div>
              <h3 className="font-medium mb-2">Latest Metrics:</h3>
              {metrics.map((metric) => (
                <div key={metric} className="mb-1">
                  {metric}: {data[data.length - 1][metric as keyof TimeSeriesData]}
                </div>
              ))}
              <div className="text-sm mt-2">
                Last updated: {new Date(data[data.length - 1].timestamp).toLocaleString()}
              </div>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};
