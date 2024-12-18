import React, { useState, useMemo } from 'react';
import { Log, LogSeverity, LogFilterOptions } from '../types/logs';

interface LogViewerProps {
  logs: Log[];
}

const severityColors: Record<LogSeverity, string> = {
  error: 'bg-red-100 text-red-800 border-red-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  debug: 'bg-gray-100 text-gray-800 border-gray-200'
};

const severityIcons: Record<LogSeverity, string> = {
  error: '🔴',
  warning: '⚠️',
  info: 'ℹ️',
  debug: '🔍'
};

export const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
  const [filters, setFilters] = useState<LogFilterOptions>({
    severities: ['error', 'warning', 'info', 'debug'],
    searchTerm: ''
  });

  const toggleSeverity = (severity: LogSeverity) => {
    setFilters(prev => ({
      ...prev,
      severities: prev.severities.includes(severity)
        ? prev.severities.filter(s => s !== severity)
        : [...prev.severities, severity]
    }));
  };

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSeverity = filters.severities.includes(log.severity);
      const matchesSearch = !filters.searchTerm || 
        log.message.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        log.source?.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      return matchesSeverity && matchesSearch;
    });
  }, [logs, filters]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Log Viewer</h2>
        
        {/* Severity Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(severityColors).map(([severity, _]) => (
            <button
              key={severity}
              onClick={() => toggleSeverity(severity as LogSeverity)}
              className={`px-4 py-2 rounded-full border transition-all ${
                filters.severities.includes(severity as LogSeverity)
                  ? severityColors[severity as LogSeverity]
                  : 'bg-gray-50 text-gray-400 border-gray-200'
              }`}
            >
              {severityIcons[severity as LogSeverity]} {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search logs..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.searchTerm}
          onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
        />
      </div>

      {/* Logs Display */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {filteredLogs.map(log => (
          <div
            key={log.id}
            className={`p-4 rounded-lg border ${severityColors[log.severity]} transition-all hover:shadow-md`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">
                {severityIcons[log.severity]} {log.severity.toUpperCase()}
              </span>
              <span className="text-sm opacity-75">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-sm">{log.message}</p>
            {log.source && (
              <p className="text-xs mt-1 opacity-75">
                Source: {log.source}
              </p>
            )}
            {log.details && (
              <pre className="mt-2 text-xs bg-black bg-opacity-5 p-2 rounded overflow-x-auto">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            )}
          </div>
        ))}
        
        {filteredLogs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No logs match your current filters
          </div>
        )}
      </div>
    </div>
  );
};

export default LogViewer;
