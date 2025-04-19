import logging
from flask import request, jsonify
from app.models.naive_bayes_classifier import NaiveBayesClassifier
from app.services.data_transformer import convert_to_serializable
import pandas as pd
from flask_restx import Namespace, Resource

# Prediction route
predict_bp = Namespace('predict', description='Route for prediction')

# Konfigurasi logging
logging.basicConfig(level=logging.DEBUG)  # Mengatur level logging
logger = logging.getLogger(__name__)

# Label encoders (jika diperlukan dalam proses)
label_encoders = {}

@predict_bp.route('/', methods=['POST'])
class Predict(Resource):
    def post(self):
        try:
            logger.debug("Starting the prediction process...")

            # Baca data dari file excel
            try:
                data = pd.read_excel('data.xlsx')
                logger.debug("Data successfully read from Excel file.")
            except Exception as e:
                logger.error(f"Failed to read Excel file: {e}")
                raise

            # Persiapkan data training
            try:
                X = data.drop(columns=['Durasi Mendapat Kerja'])  # Fitur
                y = data['Durasi Mendapat Kerja']  # Target
                logger.debug(f"Features shape: {X.shape}, Target shape: {y.shape}")
            except KeyError as e:
                logger.error(f"Column missing in data: {e}")
                raise

            # Latih model Naive Bayes
            try:
                nb = NaiveBayesClassifier()
                nb.train(X, y)
                logger.debug("Naive Bayes model trained successfully.")
            except Exception as e:
                logger.error(f"Error while training Naive Bayes model: {e}")
                raise

            # Ambil data input dari request JSON
            try:
                input_data = request.get_json()
                logger.debug(f"Received input data: {input_data}")
            except Exception as e:
                logger.error(f"Failed to get JSON from request: {e}")
                raise

            # Prediksi menggunakan model Naive Bayes
            try:
                # predicted_class, posteriors, likelihood_details = nb.predict(input_data)
                predicted_class, posteriors, likelihood_details, evidence = nb.predict(input_data)
                logger.debug(f"Prediction result - predicted_class: {predicted_class}")
            
            except Exception as e:
                logger.error(f"Error during prediction: {e}")
                raise

            # Dapatkan informasi prior (probabilitas kelas)
            priors = nb.class_probs
            logger.debug(f"Class priors: {priors}")

            # Serialize hasil prediksi ke format yang bisa diterima oleh JSON
            predicted_class = convert_to_serializable(predicted_class)
            posteriors = convert_to_serializable(posteriors)
            likelihood_details = convert_to_serializable(likelihood_details)
            priors = convert_to_serializable(priors)
            evidence = convert_to_serializable(evidence)
        
            
            print(posteriors)


            # Kembalikan response JSON dengan hasil prediksi dan detail model
            response = {
                "predicted_class": predicted_class,
                "posteriors": posteriors,
                "likelihoods": likelihood_details,
                "priors": priors,
                "evidence": evidence 
            }
            logger.debug("Returning response with prediction results.")
            return response, 200

        except Exception as e:
            # Tangani error dan log detailnya
            logger.error(f"Error occurred: {str(e)}", exc_info=True)
            return jsonify({"error": str(e)}), 400
