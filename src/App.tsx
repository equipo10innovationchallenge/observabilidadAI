import React, { useState } from 'react';
import { ModelSelector } from './components/ModelSelector';
import { MetricCard } from './components/MetricCard';
import { AIInsights } from './components/AIInsights';
import { models } from './types/metrics';

function App() {
  const [selectedModelId, setSelectedModelId] = useState(models[0].id);
  const selectedModel = models.find((m) => m.id === selectedModelId)!;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Model Observability</h1>
          <p className="text-gray-600">Monitor and analyze performance metrics for AI models</p>
        </div>

        <ModelSelector
          selectedModel={selectedModelId}
          onModelChange={setSelectedModelId}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Precision"
            value={selectedModel.metrics.precision * 100}
            unit="%"
            description="Accuracy of model predictions"
            history={selectedModel.metrics.history.precision}
            color="#3b82f6"
          />
          <MetricCard
            title="Consistency"
            value={selectedModel.metrics.consistency * 100}
            unit="%"
            description="Stability of model outputs"
            history={selectedModel.metrics.history.consistency}
            color="#10b981"
          />
          <MetricCard
            title="F1 Score"
            value={selectedModel.metrics.f1Score * 100}
            unit="%"
            description="Balanced measure of precision and recall"
            history={selectedModel.metrics.history.f1Score}
            color="#6366f1"
          />
          <MetricCard
            title="Relevance"
            value={selectedModel.metrics.relevance * 100}
            unit="%"
            description="Contextual accuracy of responses"
            history={selectedModel.metrics.history.relevance}
            color="#8b5cf6"
          />
          <MetricCard
            title="Throughput"
            value={selectedModel.metrics.throughput}
            unit="req/s"
            description="Requests processed per second"
            history={selectedModel.metrics.history.throughput}
            color="#ec4899"
          />
          <MetricCard
            title="Latency"
            value={selectedModel.metrics.latency}
            unit="ms"
            description="Average response time"
            history={selectedModel.metrics.history.latency}
            color="#f59e0b"
          />
        </div>

        <AIInsights model={selectedModel} />
      </div>
    </div>
  );
}

export default App;