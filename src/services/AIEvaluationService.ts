import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export interface EvaluationRequest {
  model_id: string;
  dataset_id: string;
}

export interface MonitoringRequest {
  model_id: string;
}

export interface EvaluationResponse {
  status: string;
  evaluation_id: string;
  timestamp: string;
}

export interface EvaluationStatus {
  evaluation_id: string;
  status: string;
  metrics?: {
    precision?: number;
    coherence?: number;
    F1?: number;
    relevance?: number;
  };
  timestamp: string;
}

export interface MonitoringMetrics {
  status: string;
  metrics: {
    model_id: string;
    performance_metrics: {
      latency: number;
      throughput: number;
    };
    timestamp: string;
  };
}

export class AIEvaluationService {
  /**
   * Start a model evaluation
   */
  static async evaluateModel(request: EvaluationRequest): Promise<EvaluationResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/evaluate`, request);
      return response.data;
    } catch (error) {
      console.error('Error starting model evaluation:', error);
      throw error;
    }
  }

  /**
   * Get the status of an evaluation
   */
  static async getEvaluationStatus(evaluationId: string): Promise<EvaluationStatus> {
    try {
      const response = await axios.get(`${API_BASE_URL}/evaluation/${evaluationId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting evaluation status:', error);
      throw error;
    }
  }

  /**
   * Set up model monitoring
   */
  static async setupMonitoring(request: MonitoringRequest): Promise<any> {
    try {
      const response = await axios.post(`${API_BASE_URL}/monitor/setup`, request);
      return response.data;
    } catch (error) {
      console.error('Error setting up monitoring:', error);
      throw error;
    }
  }

  /**
   * Get monitoring metrics for a model
   */
  static async getMonitoringMetrics(modelId: string): Promise<MonitoringMetrics> {
    try {
      const response = await axios.get(`${API_BASE_URL}/monitor/metrics/${modelId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting monitoring metrics:', error);
      throw error;
    }
  }

  /**
   * Check if the evaluation service is healthy
   */
  static async checkHealth(): Promise<{ status: string; service: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data;
    } catch (error) {
      console.error('Error checking service health:', error);
      throw error;
    }
  }
}
