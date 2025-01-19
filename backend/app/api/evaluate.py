from flask_restx import Namespace, Resource, fields
from flask import request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score

# Namespace untuk evaluasi
evaluate_ns = Namespace('evaluate', description='Evaluasi model dengan Confusion Matrix')

# Model input Swagger
evaluate_input = evaluate_ns.model('EvaluateInput', {
    'test_size': fields.Float(required=False, default=0.2, description='Ukuran data uji (default: 0.2)')
})

# Model output Swagger
evaluate_output = evaluate_ns.model('EvaluateOutput', {
    'test_size': fields.Float(description='Ukuran data uji'),
    'confusion_matrix': fields.List(fields.List(fields.Integer), description='Confusion matrix'),
    'accuracy': fields.Float(description='Akurasi model'),
    'precision': fields.Float(description='Presisi model'),
    'recall': fields.Float(description='Recall model'),
    'f1_score': fields.Float(description='F1 Score model'),
})

@evaluate_ns.route('/confusion_matrix')
class TestConfusionMatrix(Resource):
    @evaluate_ns.expect(evaluate_input, validate=True)
    @evaluate_ns.response(200, 'Berhasil', evaluate_output)
    @evaluate_ns.response(400, 'Kesalahan saat evaluasi')
    def post(self):
        """
        Evaluasi model menggunakan confusion matrix
        """
        try:
            # Membaca data dari file
            data = pd.read_excel('proses_data.xlsx')
            X = data.drop(columns=['Durasi Mendapat Kerja'])
            y = data['Durasi Mendapat Kerja']

            # Mendapatkan parameter dari request
            req_data = request.get_json()
            test_size = req_data.get('test_size', 0.2)

            # Membagi data menjadi data latih dan uji
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42)

            # Melatih model Naive Bayes
            nb = GaussianNB()
            nb.fit(X_train, y_train)

            # Prediksi data uji
            y_pred = nb.predict(X_test)

            # Menghitung confusion matrix dan metrik lainnya
            cm = confusion_matrix(y_test, y_pred)
            accuracy = accuracy_score(y_test, y_pred)
            precision = precision_score(y_test, y_pred, average='binary', zero_division=0)
            recall = recall_score(y_test, y_pred, average='binary', zero_division=0)
            f1 = f1_score(y_test, y_pred, average='binary', zero_division=0)

            # Menyiapkan hasil untuk respons
            result = {
                "test_size": test_size,
                "confusion_matrix": cm.tolist(),
                "accuracy": accuracy,
                "precision": precision,
                "recall": recall,
                "f1_score": f1
            }

            return result, 200

        except Exception as e:
            return jsonify({"error": str(e)}), 400
