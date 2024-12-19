export interface TimeSeriesData {
  timestamp: string;
  value: number;
}

export interface ModelMetrics {
  groundedness: number;
  relevance: number;
  coherence: number;
  fluency: number;
  similarity: number;
  history: {
    groundedness: TimeSeriesData[];
    relevance: TimeSeriesData[];
    coherence: TimeSeriesData[];
    fluency: TimeSeriesData[];
    similarity: TimeSeriesData[];
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
      groundedness: 0.95,
      relevance: 0.92,
      coherence: 0.94,
      fluency: 0.96,
      similarity: 0.93,
      history: {
        groundedness: generateTimeSeriesData(0.95),
        relevance: generateTimeSeriesData(0.92),
        coherence: generateTimeSeriesData(0.94),
        fluency: generateTimeSeriesData(0.96),
        similarity: generateTimeSeriesData(0.93)
      },
    },
  },
  {
    id: 'llama',
    name: 'Llama-3.3-70B-Instruct',
    metrics: {
      groundedness: 0.89,
      relevance: 0.88,
      coherence: 0.90,
      fluency: 0.92,
      similarity: 0.87,
      history: {
        groundedness: generateTimeSeriesData(0.89),
        relevance: generateTimeSeriesData(0.88),
        coherence: generateTimeSeriesData(0.90),
        fluency: generateTimeSeriesData(0.92),
        similarity: generateTimeSeriesData(0.87)
      },
    },
  },
  {
    id: 'phi4',
    name: 'Phi-4',
    metrics: {
      groundedness: 0.87,
      relevance: 0.85,
      coherence: 0.88,
      fluency: 0.89,
      similarity: 0.86,
      history: {
        groundedness: generateTimeSeriesData(0.87),
        relevance: generateTimeSeriesData(0.85),
        coherence: generateTimeSeriesData(0.88),
        fluency: generateTimeSeriesData(0.89),
        similarity: generateTimeSeriesData(0.86)
      },
    },
  },
];
