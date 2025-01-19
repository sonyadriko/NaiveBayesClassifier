import logging
from flask import request, jsonify
from app.models.naive_bayes_classifier import NaiveBayesClassifier
from app.services.data_transformer import convert_to_serializable
import pandas as pd
from flask_restx import Namespace, Resource

# Prediction route
predict_bp = Namespace('predict', description='Route for prediction')
# Konfigurasi logging
label_encoders = {}

@predict_bp.route('/', methods=['POST'])
class Predict(Resource):
    def post(self):
        try:
            data = pd.read_excel('proses_data.xlsx')

            # Prepare the training data (assuming 'Durasi Mendapat Kerja' is your target column)
            X = data.drop(columns=['Durasi Mendapat Kerja'])  # Features
            y = data['Durasi Mendapat Kerja']  # Target
            # Instantiate and train NaiveBayesClassifier
            nb = NaiveBayesClassifier()
            nb.train(X, y)

            # Get input data from the request JSON
            input_data = request.get_json()

            # Predict class using Naive Bayes model and get prior, likelihood, posterior
            predicted_class, posteriors, likelihood_details = nb.predict(input_data)

            # Add prior information (class probabilities)
            priors = nb.class_probs

            # Serialize the prediction result into JSON-compatible format
            predicted_class = convert_to_serializable(predicted_class)
            posteriors = convert_to_serializable(posteriors)
            likelihood_details = convert_to_serializable(likelihood_details)
            priors = convert_to_serializable(priors)
            # Return JSON response with prediction and model details
            response = {
                "predicted_class": predicted_class,
                "posteriors": posteriors,
                "likelihoods": likelihood_details,
                "priors": priors 
            }
            return response, 200
        except Exception as e:
            # Log the error and return the error message in response
            logging.error(f"Error occurred: {str(e)}", exc_info=True)
            return jsonify({"error": str(e)}), 400