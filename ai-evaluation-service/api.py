from flask import Flask, request, jsonify
from flask_cors import CORS
from model_evaluator import ModelEvaluator
import os

app = Flask(__name__)
CORS(app)

# Initialize the ModelEvaluator with the connection string
PROJECT_CONNECTION_STRING = "2g5uC21UKyG9BIEaKEvOxOvp2g81TKguRuggkYniDrXdEkmSv4PwJQQJ99ALACYeBjFXJ3w3AAAAACOGx9IE"
evaluator = ModelEvaluator(PROJECT_CONNECTION_STRING)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "AI Model Evaluation API"})

@app.route('/evaluate', methods=['POST'])
def evaluate():
    """
    Start model evaluation
    
    Expected JSON payload:
    {
        "model_id": "your-model-id",
        "dataset_id": "your-dataset-id"
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'model_id' not in data or 'dataset_id' not in data:
            return jsonify({
                "error": "Missing required parameters",
                "required": ["model_id", "dataset_id"]
            }), 400

        evaluation_results = evaluator.evaluate_model_performance(
            model_id=data['model_id'],
            dataset_id=data['dataset_id']
        )

        return jsonify({
            "status": "evaluation started",
            "evaluation_id": evaluation_results.get("evaluation_id"),
            "timestamp": evaluation_results.get("timestamp")
        })

    except Exception as e:
        return jsonify({
            "error": str(e),
            "status": "evaluation failed"
        }), 500

@app.route('/evaluation/<evaluation_id>', methods=['GET'])
def get_evaluation_status(evaluation_id):
    """Get the status of a specific evaluation"""
    try:
        status = evaluator.get_evaluation_status(evaluation_id)
        return jsonify(status)

    except Exception as e:
        return jsonify({
            "error": str(e),
            "status": "status check failed"
        }), 500

@app.route('/monitor/setup', methods=['POST'])
def setup_monitoring():
    """
    Setup monitoring for a model
    
    Expected JSON payload:
    {
        "model_id": "your-model-id"
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'model_id' not in data:
            return jsonify({
                "error": "Missing model_id parameter"
            }), 400

        monitoring_config = evaluator.setup_model_monitoring(data['model_id'])
        return jsonify({
            "status": "monitoring setup complete",
            "configuration": monitoring_config
        })

    except Exception as e:
        return jsonify({
            "error": str(e),
            "status": "monitoring setup failed"
        }), 500

@app.route('/monitor/metrics/<model_id>', methods=['GET'])
def get_metrics(model_id):
    """Get current monitoring metrics for a model"""
    try:
        metrics = evaluator.get_monitoring_metrics(model_id)
        return jsonify({
            "status": "success",
            "metrics": metrics
        })

    except Exception as e:
        return jsonify({
            "error": str(e),
            "status": "metrics retrieval failed"
        }), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Not found",
        "message": "The requested endpoint does not exist"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "error": "Internal server error",
        "message": str(error)
    }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
