export interface TimeSeriesData {
  timestamp: string;
  value: number;
}

export interface ModelMetrics {
  precision: number;
  consistency: number;
  f1Score: number;
  relevance: number;
  throughput: number;
  latency: number;
  history: {
    precision: TimeSeriesData[];
    consistency: TimeSeriesData[];
    f1Score: TimeSeriesData[];
    relevance: TimeSeriesData[];
    throughput: TimeSeriesData[];
    latency: TimeSeriesData[];
  };
}

export interface Model {
  id: string;
  name: string;
  metrics: ModelMetrics;
}

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

export const models: Model[] = [
  {
    id: 'gpt4',
    name: 'GPT-4',
    metrics: {
      precision: 0.95,
      consistency: 0.92,
      f1Score: 0.94,
      relevance: 0.96,
      throughput: 850,
      latency: 250,
      history: {
        precision: generateTimeSeriesData(0.95),
        consistency: generateTimeSeriesData(0.92),
        f1Score: generateTimeSeriesData(0.94),
        relevance: generateTimeSeriesData(0.96),
        throughput: generateTimeSeriesData(850),
        latency: generateTimeSeriesData(250),
      },
    },
  },
  {
    id: 'llama',
    name: 'Llama-3.3-70B-Instruct',
    metrics: {
      precision: 0.89,
      consistency: 0.88,
      f1Score: 0.90,
      relevance: 0.92,
      throughput: 920,
      latency: 180,
      history: {
        precision: generateTimeSeriesData(0.89),
        consistency: generateTimeSeriesData(0.88),
        f1Score: generateTimeSeriesData(0.90),
        relevance: generateTimeSeriesData(0.92),
        throughput: generateTimeSeriesData(920),
        latency: generateTimeSeriesData(180),
      },
    },
  },
  {
    id: 'phi4',
    name: 'Phi-4',
    metrics: {
      precision: 0.87,
      consistency: 0.85,
      f1Score: 0.88,
      relevance: 0.89,
      throughput: 1100,
      latency: 150,
      history: {
        precision: generateTimeSeriesData(0.87),
        consistency: generateTimeSeriesData(0.85),
        f1Score: generateTimeSeriesData(0.88),
        relevance: generateTimeSeriesData(0.89),
        throughput: generateTimeSeriesData(1100),
        latency: generateTimeSeriesData(150),
      },
    },
  },
];