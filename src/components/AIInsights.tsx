import React from 'react';
import { Lightbulb } from 'lucide-react';
import { Model } from '../types/metrics';

interface AIInsightsProps {
  model: Model;
}

function generateInsights(model: Model): string {
  const metrics = model.metrics;
  const insights = [];

  if (metrics.precision > 0.9) {
    insights.push(`${model.name} shows excellent precision (${(metrics.precision * 100).toFixed(1)}%), indicating highly accurate predictions.`);
  }

  if (metrics.latency < 200) {
    insights.push(`Low latency of ${metrics.latency}ms suggests optimal performance for real-time applications.`);
  }

  if (metrics.throughput > 1000) {
    insights.push(`High throughput of ${metrics.throughput} requests/second indicates strong scaling capabilities.`);
  }

  if (metrics.consistency < 0.9) {
    insights.push(`Consistency score of ${(metrics.consistency * 100).toFixed(1)}% suggests room for improvement in output stability.`);
  }

  return insights.join(' ');
}

export function AIInsights({ model }: AIInsightsProps) {
  const insights = generateInsights(model);

  return (
    <div className="mt-8 p-6 bg-blue-50 rounded-xl">
      <div className="flex items-start space-x-3">
        <Lightbulb className="w-6 h-6 text-blue-600 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-2">AI Insights</h3>
          <p className="text-blue-800">{insights}</p>
        </div>
      </div>
    </div>
  );
}