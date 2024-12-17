import { useState } from 'react';
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Model Observability Platform</h1>
          <p className="text-gray-600">Real-time monitoring and analysis of AI model performance metrics</p>
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
            definition="Precision measures the proportion of positive identifications that were actually correct. A precision of 95% means that when the model predicts something as positive, it is correct 95% of the time."
            history={selectedModel.metrics.history.precision}
            color="#3b82f6"
          />
          <MetricCard
            title="Consistency"
            value={selectedModel.metrics.consistency * 100}
            unit="%"
            description="Stability of model outputs"
            definition="Consistency evaluates how stable the model's outputs are when given similar inputs. Higher consistency indicates that the model produces similar results for similar queries, making it more reliable and predictable."
            history={selectedModel.metrics.history.consistency}
            color="#10b981"
          />
          <MetricCard
            title="F1 Score"
            value={selectedModel.metrics.f1Score * 100}
            unit="%"
            description="Balanced measure of precision and recall"
            definition="F1 Score is the harmonic mean of precision and recall, providing a single score that balances both metrics. It's particularly useful when you need a balanced measure of a model's accuracy, especially with imbalanced datasets."
            history={selectedModel.metrics.history.f1Score}
            color="#6366f1"
          />
          <MetricCard
            title="Relevance"
            value={selectedModel.metrics.relevance * 100}
            unit="%"
            description="Contextual accuracy of responses"
            definition="Relevance measures how well the model's responses align with the context and intent of the input. It evaluates whether the outputs are not just accurate but also appropriate and useful for the given context."
            history={selectedModel.metrics.history.relevance}
            color="#8b5cf6"
          />
          <MetricCard
            title="Throughput"
            value={selectedModel.metrics.throughput}
            unit="req/s"
            description="Requests processed per second"
            definition="Throughput represents the number of requests the model can process per second. This metric is crucial for understanding the model's processing capacity and scalability in production environments."
            history={selectedModel.metrics.history.throughput}
            color="#ec4899"
          />
          <MetricCard
            title="Latency"
            value={selectedModel.metrics.latency}
            unit="ms"
            description="Average response time"
            definition="Latency measures the average time taken to process a request and return a response. Lower latency indicates better real-time performance and user experience. This includes both model inference time and any additional processing overhead."
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
