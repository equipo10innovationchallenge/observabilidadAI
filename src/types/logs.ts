export type LogSeverity = 'error' | 'warning' | 'info' | 'debug';

export interface Log {
  id: string;
  timestamp: string;
  severity: LogSeverity;
  message: string;
  source?: string;
  details?: any;
}

export interface LogFilterOptions {
  severities: LogSeverity[];
  startDate?: Date;
  endDate?: Date;
  searchTerm?: string;
}
