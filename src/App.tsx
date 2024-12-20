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

function App() {
  const [selectedModel, setSelectedModel] = useState<string>(models[0].id);
  const currentModel = models.find(m => m.id === selectedModel) || models[0];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <img 
            src="/logo-insight-lens.png"
            alt="InsightLens Logo" 
            className="h-10 w-10"
          />
          <h1 className="text-3xl font-bold text-gray-900">
            InsightLens Dashboard
          </h1>
        </div>

        <div className="mb-8">
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </div>

        {/* First Row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <MetricCard
            title="Groundedness"
            value={currentModel.metrics.groundedness * 100}
            unit="%"
            description="Factual accuracy and reliability"
            definition="Measures how well the model's responses align with known facts and source material"
            history={currentModel.metrics.history.groundedness}
            color="#3b82f6"
          />
          <MetricCard
            title="Relevance"
            value={currentModel.metrics.relevance * 100}
            unit="%"
            description="Response appropriateness"
            definition="Evaluates how well the model's responses address the given queries"
            history={currentModel.metrics.history.relevance}
            color="#10b981"
          />
          <MetricCard
            title="Coherence"
            value={currentModel.metrics.coherence * 100}
            unit="%"
            description="Logical consistency"
            definition="Measures the logical flow and consistency of the model's responses"
            history={currentModel.metrics.history.coherence}
            color="#f59e0b"
          />
        </div>

        {/* Second Row - 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <MetricCard
            title="Fluency"
            value={currentModel.metrics.fluency * 100}
            unit="%"
            description="Language quality"
            definition="Assesses the grammatical correctness and natural flow of the text"
            history={currentModel.metrics.history.fluency}
            color="#6366f1"
          />
          <MetricCard
            title="Similarity"
            value={currentModel.metrics.similarity * 100}
            unit="%"
            description="Output consistency"
            definition="Measures how consistent the model's outputs are across similar inputs"
            history={currentModel.metrics.history.similarity}
            color="#ec4899"
          />
        </div>

        {/* AI Insights Row */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
            <AIInsights model={currentModel} />
          </div>
        </div>

        {/* Logs Row */}
        <div className="mb-8">
          <LogViewer logs={sampleLogs} />
        </div>
      </div>
    </div>
  );
}

export default App;
