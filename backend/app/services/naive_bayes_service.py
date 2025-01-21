import pandas as pd
from models.naive_bayes_classifier import NaiveBayesClassifier

def train_naive_bayes(data_file):
    """Melatih model Naive Bayes dengan data dari file Excel."""
    data = pd.read_excel(data_file)
    X = data.drop(columns=['Durasi Mendapat Kerja'])  # Ganti sesuai kolom target Anda
    y = data['Durasi Mendapat Kerja']
    
    nb = NaiveBayesClassifier()
    nb.train(X, y)
    return nb

def predict_naive_bayes(model, input_data):
    """Memprediksi data menggunakan model Naive Bayes."""
    return model.predict(input_data)
