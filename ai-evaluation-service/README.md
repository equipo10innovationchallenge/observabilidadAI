# AI Model Evaluation Service

This service uses the Azure AI Evaluation SDK to evaluate and monitor AI models, exposed through a REST API.

## Setup

1. Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure Azure credentials:
- Ensure you have proper Azure credentials configured (using DefaultAzureCredential)
- Have your Azure AI foundry project connection string ready
- Prepare your model ID and dataset ID for evaluation

## Running the API Service

Start the Flask API server:
```bash
python api.py
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Health Check
```
GET /health
Response: {"status": "healthy", "service": "AI Model Evaluation API"}
```

### Model Evaluation
```
POST /evaluate
Request Body:
{
    "model_id": "your-model-id",
    "dataset_id": "your-dataset-id"
}
Response:
{
    "status": "evaluation started",
    "evaluation_id": "eval_id",
    "timestamp": "iso-timestamp"
}
```

### Get Evaluation Status
```
GET /evaluation/<evaluation_id>
Response:
{
    "evaluation_id": "eval_id",
    "status": "status",
    "metrics": {...},
    "timestamp": "iso-timestamp"
}
```

### Setup Monitoring
```
POST /monitor/setup
Request Body:
{
    "model_id": "your-model-id"
}
Response:
{
    "status": "monitoring setup complete",
    "configuration": {...}
}
```

### Get Monitoring Metrics
```
GET /monitor/metrics/<model_id>
Response:
{
    "status": "success",
    "metrics": {
        "model_id": "id",
        "performance_metrics": {
            "latency": value,
            "throughput": value
        },
        "timestamp": "iso-timestamp"
    }
}
```

## Evaluation Metrics

The service evaluates models using the following metrics:
- Precision
- Coherence
- F1 Score
- Relevance

## Performance Monitoring Metrics

Real-time performance monitoring includes:
- Latency: Response time of model predictions
- Throughput: Number of predictions processed per unit time

## Features

- RESTful API interface
- Model performance evaluation using Azure AI Evaluation SDK
- Real-time performance monitoring
- Continuous metric collection
- Evaluation status tracking
- Asynchronous evaluation job processing
- Pre-configured evaluation metrics
- Performance metrics tracking
- Secure connection using Azure AI foundry project connection string
- Dataset-based evaluation
- CORS support for cross-origin requests

## Requirements

- Python 3.7+
- Azure AI Projects SDK
- Azure Identity package
- Flask web framework
- Valid Azure credentials
- Azure AI foundry project connection string
- Model ID and Dataset ID for evaluation

## Error Handling

The API includes comprehensive error handling for:
- Invalid requests (400)
- Not found resources (404)
- Server errors (500)
- Connection issues
- Invalid credentials
- Evaluation failures
- Monitoring setup errors
- Metric collection failures

Each endpoint includes proper error responses with descriptive messages to help diagnose and resolve issues quickly.

## Example API Usage

Using curl:
```bash
# Start evaluation
curl -X POST http://localhost:5000/evaluate \
  -H "Content-Type: application/json" \
  -d '{"model_id": "your-model-id", "dataset_id": "your-dataset-id"}'

# Check evaluation status
curl http://localhost:5000/evaluation/your-evaluation-id

# Setup monitoring
curl -X POST http://localhost:5000/monitor/setup \
  -H "Content-Type: application/json" \
  -d '{"model_id": "your-model-id"}'

# Get metrics
curl http://localhost:5000/monitor/metrics/your-model-id
```

Using Python requests:
```python
import requests

base_url = "http://localhost:5000"

# Start evaluation
response = requests.post(
    f"{base_url}/evaluate",
    json={
        "model_id": "your-model-id",
        "dataset_id": "your-dataset-id"
    }
)
evaluation_id = response.json()["evaluation_id"]

# Get evaluation status
status = requests.get(f"{base_url}/evaluation/{evaluation_id}").json()

# Setup monitoring
monitoring = requests.post(
    f"{base_url}/monitor/setup",
    json={"model_id": "your-model-id"}
).json()

# Get metrics
metrics = requests.get(f"{base_url}/monitor/metrics/your-model-id").json()
