import os
import pandas as pd
from flask import Blueprint, request, jsonify
from ..services.naive_bayes import NaiveBayesClassifier
from ..services.utils import preprocess_data

bp = Blueprint('predict', __name__, url_prefix='/predict')

# Lokasi file Excel yang benar
DATA_PATH = os.path.join(os.path.dirname(__file__), '../../datasiswa.xlsx')

# Inisialisasi model
model = NaiveBayesClassifier()

# Load data dan latih model saat server mulai
try:
    df = pd.read_excel(DATA_PATH)
    X = df.drop('Durasi Mendapat Kerja', axis=1)
    y = df['Durasi Mendapat Kerja']  # Biarkan sebagai Pandas Series
    model.train(X, y)
except Exception as e:
    raise ValueError(f"Error saat membaca atau melatih data: {e}")

# Endpoint untuk prediksi
@bp.route('/', methods=['POST'])
def predict():
    try:
        # Ambil data JSON dari request
        input_data = request.get_json()
        if not input_data:
            return jsonify({"error": "Data tidak ditemukan", "success": False}), 400

        # Buat DataFrame dari input data
        new_data = pd.DataFrame([input_data], columns=X.columns)

        # Menangani label yang tidak dikenal pada data uji
        for col in new_data.columns:
            if col in model.encoders:  # Pastikan kolom tersebut ada dalam model
                encoder = model.encoders[col]
                # Periksa jika ada label yang tidak dikenal
                new_labels = new_data[col].values
                if not all(val in encoder.classes_ for val in new_labels):
                    # Jika ada label baru, encode dengan encoder
                    new_data[col] = encoder.transform(new_data[col])

        # Prediksi kelas
        predictions, _ = model.predict(new_data)

        # Menghitung probabilitas
        probabilities = model.calculate_probabilities(new_data)

        # Mengemas hasil
        response = {
            "predictions": predictions.tolist(),  # Pastikan hasilnya berbentuk list untuk JSON
            "probabilities": probabilities.tolist(),  # Pastikan hasilnya berbentuk list untuk JSON
            "success": True
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 400
