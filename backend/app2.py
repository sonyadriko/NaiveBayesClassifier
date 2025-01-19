from flask import Flask, request, jsonify, send_file
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS
from io import BytesIO
import os
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
# Membuat instance aplikasi Flask
app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
        try:
            # Memeriksa apakah ada file yang diunggah
            if 'file' not in request.files:
                return jsonify({"error": "No file part"}), 400

            file = request.files['file']

            if file.filename == '':
                return jsonify({"error": "No selected file"}), 400

            if file and (file.filename.endswith('.xls') or file.filename.endswith('.xlsx')):
                # Membaca file Excel yang diunggah langsung dari memori
                data = pd.read_excel(file)
                
                upload_path = 'data.xlsx'
                data.to_excel(upload_path, index=False, sheet_name='Uploaded Data')

                # Menampilkan data yang telah dibaca untuk memverifikasi
                print(data.head())

                # LabelEncoder untuk setiap kolom kategori
                global label_encoders  
                label_encoders = {}  # Menyimpan encoder untuk tiap kolom
                for column in data.columns:
                    if data[column].dtype == 'object':  # Hanya untuk kolom kategori
                        le = LabelEncoder()
                        data[column] = le.fit_transform(data[column])
                        label_encoders[column] = le  # Simpan encoder

                # Menyimpan hasil ke file Excel baru dengan nama 'proses_data.xlsx'
                file_path = 'proses_data.xlsx'
                data.to_excel(file_path, index=False, sheet_name='Processed Data')

                # Mengembalikan respons sukses
                return jsonify({"message": "File berhasil diproses dan disimpan sebagai proses_data.xlsx"}), 200

            else:
                return jsonify({"error": "Invalid file format. Only .xls and .xlsx are allowed."}), 400

        except Exception as e:
            return jsonify({"error": str(e)}), 400

# Simulasi pelatihan model Naive Bayes
class NaiveBayesClassifier:
    def __init__(self):
        self.class_probs = {}  # Probabilitas prior P(C)
        self.likelihoods = {}  # Probabilitas likelihood P(X|C)
        self.classes = None  # Kelas yang ada

    def train(self, X, y):
        """Melatih model Naive Bayes dengan data fitur X dan label y."""
        self.classes = np.unique(y)
        total_samples = len(y)

        # Hitung prior probabilities P(C)
        for cls in self.classes:
            cls_count = (y == cls).sum()
            self.class_probs[cls] = cls_count / total_samples

        # Hitung likelihoods P(X|C) untuk setiap fitur
        for cls in self.classes:
            class_data = X[y == cls]
            feature_likelihoods = {}
            for column in X.columns:
                feature_likelihoods[column] = {}
                feature_values = class_data[column].unique()
                for value in feature_values:
                    likelihood = (class_data[column] == value).sum() / len(class_data)
                    feature_likelihoods[column][value] = likelihood
            self.likelihoods[cls] = feature_likelihoods

    # menggunakan evidence
    # def predict(self, features):
    #     """Memprediksi kelas berdasarkan fitur yang diberikan dan mengembalikan prior, likelihood, dan posterior."""
    #     posteriors = {}
    #     likelihood_details = {}
    #     for cls in self.classes:
    #         prior = self.class_probs.get(cls, 0)
    #         likelihood = 1
    #         feature_likelihoods = {}

    #         # Menghitung likelihood untuk setiap fitur
    #         for feature, value in features.items():
    #             if feature in self.likelihoods[cls] and value in self.likelihoods[cls][feature]:
    #                 likelihood_value = self.likelihoods[cls][feature][value]
    #                 feature_likelihoods[feature] = likelihood_value
    #                 likelihood *= likelihood_value
    #             else:
    #                 likelihood_value = 1e-6  # Jika nilai tidak ditemukan, gunakan probabilitas kecil
    #                 feature_likelihoods[feature] = likelihood_value
    #                 likelihood *= likelihood_value

    #         # Menghitung posterior
    #         posteriors[cls] = prior * likelihood
    #         likelihood_details[cls] = feature_likelihoods

    #     # Normalisasi posterior
    #     total = sum(posteriors.values())
    #     for cls in posteriors:
    #         posteriors[cls] /= total

    #     # Menentukan kelas yang diprediksi
    #     predicted_class = max(posteriors, key=posteriors.get)

    #     return predicted_class, posteriors, likelihood_details

    #tanpa evidence
    def predict(self, features):
        posteriors = {}
        likelihood_details = {}
        
        for cls in self.classes:
            prior = self.class_probs.get(cls, 0)  # Prior untuk kelas
            likelihood = 1
            feature_likelihoods = {}

            # Menghitung likelihood untuk setiap fitur
            for feature, value in features.items():
                if feature in self.likelihoods[cls] and value in self.likelihoods[cls][feature]:
                    likelihood_value = self.likelihoods[cls][feature][value]
                    feature_likelihoods[feature] = likelihood_value
                    likelihood *= likelihood_value
                else:
                    likelihood_value = 1e-6  # Jika nilai tidak ditemukan, gunakan probabilitas kecil
                    feature_likelihoods[feature] = likelihood_value
                    likelihood *= likelihood_value

            # Menghitung posterior tanpa normalisasi
            posteriors[cls] = prior * likelihood
            likelihood_details[cls] = feature_likelihoods
            
            # print(f"Class: {cls}")
            # print(f"Prior: {prior}")
            # print(f"Likelihood Details: {feature_likelihoods}")
            # print(f"Likelihood Product: {likelihood}")
            # print(f"Posterior (before normalization): {posteriors[cls]}")

        # Menentukan kelas yang diprediksi
        predicted_class = max(posteriors, key=posteriors.get)

        return predicted_class, posteriors, likelihood_details

# Fungsi untuk mengonversi semua data ke format yang dapat diserialisasi JSON
def convert_to_serializable(data):
    """Konversi objek data ke tipe yang bisa diserialisasi oleh JSON (int, float, str, bool, None)."""
    if isinstance(data, dict):
        return {str(key): convert_to_serializable(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [convert_to_serializable(item) for item in data]
    elif isinstance(data, np.ndarray):
        return data.tolist()
    elif isinstance(data, (np.int64, np.float64)):
        return int(data) if isinstance(data, np.int64) else float(data)
    else:
        return data  # Mengembalikan data yang sudah dalam format yang valid

# Endpoint /convert untuk mengonversi data
@app.route('/convert')
def convert_data():
        try:
            # Mendapatkan data JSON dari request
            input_data = request.get_json()

            # Mengonversi data dengan LabelEncoder
            converted_data = {}
            for key, value in input_data.items():
                if key in label_encoders:
                    converted_data[key] = label_encoders[key].transform([value])[0]
                else:
                    converted_data[key] = value

            # Mengubah tipe data menjadi tipe yang dapat diserialisasi JSON
            converted_data = convert_to_serializable(converted_data)
            
            return jsonify({"converted_data": converted_data}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

# Endpoint /predict untuk memprediksi kelas dan menampilkan prior, likelihood, dan posterior
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = pd.read_excel('proses_data.xlsx')
        # Pelatihan model
        X = data.drop(columns=['Durasi Mendapat Kerja']) 
        y = data['Durasi Mendapat Kerja']
        nb = NaiveBayesClassifier()
        nb.train(X, y)
        # Mendapatkan data JSON dari request
        input_data = request.get_json()

        # Prediksi kelas menggunakan model Naive Bayes dan mendapatkan prior, likelihood, posterior
        predicted_class, posteriors, likelihood_details = nb.predict(input_data)

        # Menambahkan prior ke dalam respons
        priors = nb.class_probs  

        # Mengubah hasil prediksi menjadi tipe yang dapat diserialisasi JSON
        predicted_class = convert_to_serializable(predicted_class)
        posteriors = convert_to_serializable(posteriors)
        likelihood_details = convert_to_serializable(likelihood_details)
        priors = convert_to_serializable(priors)

        return jsonify({
            "predicted_class": predicted_class,
            "posteriors": posteriors,
            "likelihoods": likelihood_details,
            "priors": priors 
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/get_labels', methods=['GET'])
def get_labels():
    try:
        # Mengecek apakah label_encoders sudah ada
        if not label_encoders:
            return jsonify({"error": "No encoded labels found. Please upload a file first."}), 400
        
        # Menghasilkan penjelasan kategori dan hasil encoding
        labels_info = {}
        for column, encoder in label_encoders.items():
            labels_info[column] = {
                'encoded_values': {i: label for i, label in enumerate(encoder.classes_)},
                'classes': encoder.classes_.tolist()
            }
        
        return jsonify({"labels": labels_info}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/read')
def read_data():
        try:
            # Lokasi file data (sesuaikan dengan file Anda)
            file_path = 'data.xlsx'  # Ganti dengan nama file Anda
            
            # Membaca data dari Excel (juga bisa CSV jika perlu)
            data = pd.read_excel(file_path) 
            
            # Mengonversi data ke format JSON
            data_json = data.to_dict(orient='records')  # Mengembalikan data sebagai list of dictionaries
            
            return jsonify({"data": data_json}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

# Route untuk membaca data yang telah diproses
@app.route('/readprosesdata')
def read_proses_data():
        try:
            # Lokasi file data 
            file_path = 'proses_data.xlsx'  
            
            # Membaca data dari Excel
            data = pd.read_excel(file_path)  
            
            # Mengonversi data ke format JSON
            data_json = data.to_dict(orient='records') 
            
            return jsonify({"data": data_json}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

@app.route('/test_confusion_matrix', methods=['POST'])
def test_confusion_matrix():
    try:
        data = pd.read_excel('proses_data.xlsx')
        X = data.drop(columns=['Durasi Mendapat Kerja'])
        y = data['Durasi Mendapat Kerja']
        
        # Membagi dataset menjadi data latih dan data uji
        data = request.get_json()
        test_size = data.get('test_size', 0.2)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42)

        # Melatih model Naive Bayes
        nb = GaussianNB()
        nb.fit(X_train, y_train)

        # Prediksi data uji
        y_pred = nb.predict(X_test)

        # Menghitung confusion matrix
        cm = confusion_matrix(y_test, y_pred)
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred, average='binary')
        recall = recall_score(y_test, y_pred, average='binary')
        f1 = f1_score(y_test, y_pred, average='binary')

        cm_serializable = cm.tolist()
        result = {
            "test_size": test_size,
            "confusion_matrix": cm_serializable,
            "accuracy": accuracy,
            "precision": precision,
            "recall": recall,
            "f1_score": f1
        }

        return jsonify(result), 200

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 400

# Menjalankan aplikasi Flask
if __name__ == '__main__':
    app.run(debug=True)
