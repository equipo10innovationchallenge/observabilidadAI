import React, { useEffect, useState } from 'react';
import { AIEvaluationService, MonitoringMetrics, EvaluationStatus } from '../services/AIEvaluationService';
import { MetricCard } from './MetricCard';
import { MetricChart, TimeSeriesData } from './MetricChart';
import { ModelSelector } from './ModelSelector';

const AIInsights: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [monitoringMetrics, setMonitoringMetrics] = useState<MonitoringMetrics | null>(null);
  const [evaluationStatus, setEvaluationStatus] = useState<EvaluationStatus | null>(null);
  const [metricsHistory, setMetricsHistory] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedModel) {
      startMonitoring();
    }
  }, [selectedModel]);

  const startMonitoring = async () => {
    try {
      setLoading(true);
      setError(null);

      // Setup monitoring for the selected model
      await AIEvaluationService.setupMonitoring({ model_id: selectedModel });

      // Start periodic metrics collection
      const intervalId = setInterval(async () => {
        const metrics = await AIEvaluationService.getMonitoringMetrics(selectedModel);
        setMonitoringMetrics(metrics);
        
        // Add to metrics history
        if (metrics.metrics.performance_metrics) {
          setMetricsHistory(prev => [...prev, {
            timestamp: metrics.metrics.timestamp,
            latency: metrics.metrics.performance_metrics.latency,
            throughput: metrics.metrics.performance_metrics.throughput,
            value: 0 // Required by TimeSeriesData but not used in this context
          }]);
        }
      }, 5000); // Update every 5 seconds

      // Cleanup interval on component unmount or model change
      return () => clearInterval(intervalId);
    } catch (err) {
      setError('Failed to start monitoring: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const startEvaluation = async () => {
    try {
      setLoading(true);
      setError(null);

      // Start evaluation
      const evaluation = await AIEvaluationService.evaluateModel({
        model_id: selectedModel,
        dataset_id: 'default-dataset' // Replace with actual dataset ID
      });

      // Poll for evaluation status
      const intervalId = setInterval(async () => {
        const status = await AIEvaluationService.getEvaluationStatus(evaluation.evaluation_id);
        setEvaluationStatus(status);

        // Stop polling if evaluation is complete
        if (status.status === 'Completed' || status.status === 'Failed') {
          clearInterval(intervalId);
        }
      }, 5000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    } catch (err) {
      setError('Failed to start evaluation: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const getLatestMetricHistory = (metric: 'latency' | 'throughput'): number[] => {
    return metricsHistory
      .slice(-10) // Get last 10 entries
      .map(entry => entry[metric] || 0);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">AI Model Insights</h1>
      
      <div className="mb-6">
        <ModelSelector
          selectedModel={selectedModel}
          onModelSelect={(modelId: string) => setSelectedModel(modelId)}
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <span className="text-gray-600">Loading...</span>
        </div>
      )}

      {selectedModel && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {monitoringMetrics?.metrics.performance_metrics && (
              <>
                <MetricCard
                  title="Latency"
                  value={monitoringMetrics.metrics.performance_metrics.latency}
                  unit="ms"
                  description="Model response time"
                  history={getLatestMetricHistory('latency')}
                />
                <MetricCard
                  title="Throughput"
                  value={monitoringMetrics.metrics.performance_metrics.throughput}
                  unit="req/s"
                  description="Requests per second"
                  history={getLatestMetricHistory('throughput')}
                />
              </>
            )}
            {evaluationStatus?.metrics && (
              <>
                <MetricCard
                  title="Precision"
                  value={evaluationStatus.metrics.precision || 0}
                  unit="%"
                  description="Model precision score"
                  history={[]}
                />
                <MetricCard
                  title="F1 Score"
                  value={evaluationStatus.metrics.F1 || 0}
                  unit="%"
                  description="F1 score metric"
                  history={[]}
                />
              </>
            )}
          </div>

          {metricsHistory.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Performance Trends</h2>
              <MetricChart
                data={metricsHistory}
                metrics={['latency', 'throughput']}
              />
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={startEvaluation}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              Start Evaluation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
