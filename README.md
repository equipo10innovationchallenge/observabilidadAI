# AI Model Observability Dashboard


 # Overview
This project provides a comprehensive AI Model Observability Dashboard to monitor, analyze, and visualize critical performance metrics for three AI models deployed on Azure Machine Learning. It combines automated metric calculation, real-time observability, and insights generation using Azure's cloud ecosystem.


## Project Goals
The primary purpose of this project is to measure and display the following key metrics for multiple AI models:

Precision
F1 Score
Relevance
Coherence
Throughput
Latency
Additionally, it uses Azure OpenAI to analyze the collected metrics, generate insights, and provide recommendations for improving model performance.


## Architecture
The project follows a modular architecture using Azure services:

Model Deployment:

AI models (GPT-4o, LLaMA-3, and Phi-4) are deployed as Managed Online Endpoints using Azure Machine Learning Studio.
Metric Calculation:

Real-time inference data is collected from the model endpoints.
Latency and Throughput are captured directly.
Precision, F1 Score, Relevance, and Coherence are calculated using Python scripts and automated pipelines in Azure Machine Learning.
Data Storage and Analysis:

Metrics are ingested into Azure Data Explorer (ADX) for efficient storage and querying.
Data can also be visualized or exported for further processing.
Insights and Recommendations:

Collected metrics are sent to Azure OpenAI Service for analysis.
The OpenAI instance, fine-tuned with knowledge of AI metrics, generates actionable insights and improvement recommendations.
Visualization:

A Power BI Embedded dashboard visualizes the metrics in an intuitive format.
The dashboard is deployed as a Web App using Azure App Service for end-user access.
## Key Features
Automated Monitoring: Real-time collection of key model performance metrics.
Insights Generation: Integration with Azure OpenAI for meaningful analysis and actionable recommendations.
Customizable Dashboard: Interactive visualizations powered by Power BI Embedded.
Scalable Design: Support for multiple models with efficient querying and storage using Azure Data Explorer.
Azure-Native Solution: Leverages Azure Machine Learning, Azure Monitor, Azure OpenAI, and App Service for seamless integration.
## Tech Stack
Azure Machine Learning: Model deployment and pipelines for metric calculation.
Azure Data Explorer (ADX): Metric storage and fast querying.
Azure OpenAI Service: Generation of insights and recommendations.
Power BI Embedded: Dashboard visualization.
Azure App Service: Web app deployment.
Python: Scripts for metric calculation and automation.
Kusto Query Language (KQL): Data querying in Azure Data Explorer.

