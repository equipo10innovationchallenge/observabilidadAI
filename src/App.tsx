import React, { useState } from 'react';
import { MetricCard } from './components/MetricCard';
import { MetricChart } from './components/MetricChart';
import { AIInsights } from './components/AIInsights';
import { ModelSelector } from './components/ModelSelector';
import { LogViewer } from './components/LogViewer';
import { Log } from './types/logs';
import { models, TimeSeriesData } from './types/metrics';

// Sample logs for demonstration
const sampleLogs: Log[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    severity: 'error',
    message: 'Failed to connect to database',
    source: 'Database Service',
    details: { error: 'Connection timeout', code: 'DB_001' }
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 5000).toISOString(),
    severity: 'warning',
    message: 'High memory usage detected',
    source: 'System Monitor',
    details: { usage: '85%', threshold: '80%' }
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 10000).toISOString(),
    severity: 'info',
    message: 'User authentication successful',
    source: 'Auth Service'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 15000).toISOString(),
    severity: 'debug',
    message: 'Cache invalidation completed',
    source: 'Cache Service',
    details: { itemsCleared: 150 }
  }
];

function generateTimeSeriesData(baseValue: number, count: number = 24): TimeSeriesData[] {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - (count - i));
    
    return {
      timestamp: date.toISOString(),
      value: baseValue + (Math.random() * 0.1 - 0.05),
    };
  });
}

function App() {
  const [selectedModel, setSelectedModel] = useState<string>(models[0].id);
  const currentModel = models.find(m => m.id === selectedModel) || models[0];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Model Observability Dashboard
        </h1>

        <div className="mb-8">
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Latency"
            value={currentModel.metrics.latency}
            unit="ms"
            description="Average response time"
            definition="Time taken to process and respond to requests"
            history={currentModel.metrics.history.latency}
            color="#3b82f6"
          />
          <MetricCard
            title="Throughput"
            value={currentModel.metrics.throughput}
            unit="req/s"
            description="Requests processed per second"
            definition="Number of requests the model can handle per second"
            history={currentModel.metrics.history.throughput}
            color="#10b981"
          />
          <MetricCard
            title="Precision"
            value={currentModel.metrics.precision * 100}
            unit="%"
            description="Model accuracy score"
            definition="Percentage of correct predictions among all predictions made"
            history={currentModel.metrics.history.precision}
            color="#f59e0b"
          />
          <MetricCard
            title="F1 Score"
            value={currentModel.metrics.f1Score * 100}
            unit="%"
            description="Overall model performance"
            definition="Harmonic mean of precision and recall"
            history={currentModel.metrics.history.f1Score}
            color="#6366f1"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Latency Over Time</h2>
            <MetricChart 
              data={currentModel.metrics.history.latency}
              color="#3b82f6"
            />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
            <AIInsights model={currentModel} />
          </div>
        </div>

        <div className="mb-8">
          <LogViewer logs={sampleLogs} />
        </div>
      </div>
    </div>
  );
}

export default App;
