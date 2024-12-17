import React from 'react';

export interface ModelSelectorProps {
  selectedModel: string;
  onModelSelect: (modelId: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelSelect }) => {
  // Example model list - in a real app, this would come from an API
  const models = [
    { id: 'model-1', name: 'Model 1' },
    { id: 'model-2', name: 'Model 2' },
    { id: 'model-3', name: 'Model 3' },
  ];

  return (
    <div className="w-full max-w-xs">
      <label htmlFor="model-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select Model
      </label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => onModelSelect(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="">Select a model...</option>
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};
