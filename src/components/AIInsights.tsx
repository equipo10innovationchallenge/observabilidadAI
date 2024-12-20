import React from 'react';
import { Lightbulb } from 'lucide-react';
import { Model } from '../types/metrics';

interface AIInsightsProps {
  model: Model;
}

function generateInsights(model: Model): string {
  const metrics = model.metrics;
  const insights = [];

  // Groundedness insights
  if (metrics.groundedness > 0.9) {
    insights.push(`${model.name} demonstrates excellent factual accuracy (${(metrics.groundedness * 100).toFixed(1)}%), providing highly reliable information.`);
  } else if (metrics.groundedness < 0.8) {
    insights.push(`Factual accuracy could be improved (${(metrics.groundedness * 100).toFixed(1)}%), suggesting a need for better grounding in source material.`);
  }

  // Relevance insights
  if (metrics.relevance > 0.9) {
    insights.push(`Responses are highly relevant (${(metrics.relevance * 100).toFixed(1)}%), showing strong query understanding.`);
  } else if (metrics.relevance < 0.8) {
    insights.push(`Response relevance (${(metrics.relevance * 100).toFixed(1)}%) could be enhanced to better address queries.`);
  }

  // Coherence insights
  if (metrics.coherence > 0.9) {
    insights.push(`Excellent logical coherence (${(metrics.coherence * 100).toFixed(1)}%) indicates well-structured responses.`);
  } else if (metrics.coherence < 0.8) {
    insights.push(`Coherence score (${(metrics.coherence * 100).toFixed(1)}%) suggests room for improvement in logical flow.`);
  }

  // Fluency insights
  if (metrics.fluency > 0.9) {
    insights.push(`High fluency score (${(metrics.fluency * 100).toFixed(1)}%) shows natural language generation.`);
  } else if (metrics.fluency < 0.8) {
    insights.push(`Language fluency (${(metrics.fluency * 100).toFixed(1)}%) could be improved for more natural text.`);
  }

  // Similarity insights
  if (metrics.similarity > 0.9) {
    insights.push(`Strong output consistency (${(metrics.similarity * 100).toFixed(1)}%) across similar queries.`);
  } else if (metrics.similarity < 0.8) {
    insights.push(`Output consistency (${(metrics.similarity * 100).toFixed(1)}%) shows variation in similar contexts.`);
  }

  // Overall performance summary
  const avgScore = (
    metrics.groundedness +
    metrics.relevance +
    metrics.coherence +
    metrics.fluency +
    metrics.similarity
  ) / 5;

  if (avgScore > 0.9) {
    insights.push(`Overall, ${model.name} is performing exceptionally well across all metrics.`);
  } else if (avgScore > 0.8) {
    insights.push(`${model.name} shows good overall performance with some areas for potential improvement.`);
  } else {
    insights.push(`There are several areas where ${model.name}'s performance could be enhanced.`);
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
