import os
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient, EvaluationClient, MonitoringClient
from datetime import datetime

class ModelEvaluator:
    def __init__(self, connection_string):
        """
        Initialize the ModelEvaluator with Azure credentials and connection string.
        
        Args:
            connection_string (str): The connection string for the Azure AI foundry project
        """
        self.credential = DefaultAzureCredential()
        self.connection_string = connection_string
        self.project_client = AIProjectClient.from_connection_string(
            conn_str=self.connection_string,
            credential=self.credential
        )
        self.evaluation_client = EvaluationClient(self.project_client)
        self.monitoring_client = MonitoringClient(self.project_client)

    def evaluate_model_performance(self, model_id, dataset_id):
        """
        Evaluate model performance using Azure AI Evaluation SDK.
        
        Args:
            model_id (str): The ID of the model to evaluate
            dataset_id (str): The ID of the dataset to use for evaluation
            
        Returns:
            dict: Evaluation results
        """
        try:
            # Create an evaluation with specific metrics
            evaluation = self.evaluation_client.create_evaluation(
                model_id=model_id,
                dataset_id=dataset_id,
                metrics=["precision", "coherence", "F1", "relevance"]
            )

            # Wait for the evaluation to complete
            evaluation_result = self.evaluation_client.wait_for_completion(
                evaluation.id,
                polling_interval_seconds=10
            )

            return {
                "evaluation_id": evaluation.id,
                "metrics": evaluation_result.metrics,
                "status": evaluation_result.status,
                "timestamp": datetime.utcnow().isoformat()
            }

        except Exception as e:
            print(f"Error during model evaluation: {str(e)}")
            raise

    def setup_model_monitoring(self, model_id):
        """
        Set up continuous monitoring for a model.
        
        Args:
            model_id (str): The ID of the model to monitor
            
        Returns:
            dict: Monitoring configuration details
        """
        try:
            # Create monitoring configuration with performance metrics
            monitoring = self.monitoring_client.create_monitoring(
                model_id=model_id,
                metrics=["latency", "throughput"]
            )

            return {
                "monitoring_id": monitoring.id,
                "model_id": model_id,
                "status": monitoring.status,
                "configured_metrics": ["latency", "throughput"],
                "timestamp": datetime.utcnow().isoformat()
            }

        except Exception as e:
            print(f"Error setting up model monitoring: {str(e)}")
            raise

    def get_monitoring_metrics(self, model_id, start_time=None):
        """
        Get real-time monitoring metrics for a model.
        
        Args:
            model_id (str): The ID of the model to monitor
            start_time (str, optional): ISO format timestamp to start collecting metrics from
            
        Returns:
            dict: Monitoring metrics
        """
        try:
            if start_time is None:
                start_time = datetime.utcnow().isoformat()

            # Get monitoring metrics
            metrics = self.monitoring_client.get_metrics(
                model_id=model_id,
                start_time=start_time
            )

            return {
                "model_id": model_id,
                "performance_metrics": {
                    "latency": metrics.get("latency"),
                    "throughput": metrics.get("throughput")
                },
                "timestamp": datetime.utcnow().isoformat()
            }

        except Exception as e:
            print(f"Error getting monitoring metrics: {str(e)}")
            raise

    def get_evaluation_status(self, evaluation_id):
        """
        Get the status of a specific evaluation.
        
        Args:
            evaluation_id (str): The ID of the evaluation to check
            
        Returns:
            dict: Evaluation status and metrics if complete
        """
        try:
            evaluation = self.evaluation_client.get_evaluation(evaluation_id)
            return {
                "evaluation_id": evaluation_id,
                "status": evaluation.status,
                "metrics": evaluation.metrics if evaluation.status == "Completed" else None,
                "timestamp": datetime.utcnow().isoformat()
            }
        except Exception as e:
            print(f"Error getting evaluation status: {str(e)}")
            raise

# Example usage
if __name__ == "__main__":
    # Use the provided connection string
    PROJECT_CONNECTION_STRING = "2g5uC21UKyG9BIEaKEvOxOvp2g81TKguRuggkYniDrXdEkmSv4PwJQQJ99ALACYeBjFXJ3w3AAAAACOGx9IE"
    
    if not PROJECT_CONNECTION_STRING:
        raise ValueError("Project connection string is required")

    # Initialize evaluator
    evaluator = ModelEvaluator(PROJECT_CONNECTION_STRING)

    # Example model and dataset IDs
    MODEL_ID = "your-model-id"
    DATASET_ID = "your-dataset-id"

    try:
        # Start model evaluation
        evaluation_results = evaluator.evaluate_model_performance(MODEL_ID, DATASET_ID)
        print("Evaluation Started:", evaluation_results)

        # Check evaluation status
        if "evaluation_id" in evaluation_results:
            status = evaluator.get_evaluation_status(evaluation_results["evaluation_id"])
            print("Evaluation Status:", status)

        # Set up continuous monitoring
        monitoring_config = evaluator.setup_model_monitoring(MODEL_ID)
        print("Monitoring Configuration:", monitoring_config)

        # Get real-time metrics
        monitoring_metrics = evaluator.get_monitoring_metrics(MODEL_ID)
        print("Current Performance Metrics:", monitoring_metrics)

    except Exception as e:
        print(f"Error in model evaluation/monitoring: {str(e)}")
