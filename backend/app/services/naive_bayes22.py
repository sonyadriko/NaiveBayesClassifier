import numpy as np
import pandas as pd
from collections import defaultdict

class NaiveBayesClassifier:
    def __init__(self):
        self.priors = {}
        self.likelihoods = defaultdict(dict)

    def train(self, X, y):
        # Menghitung prior probabilitas (P(C))
        total_samples = len(y)
        class_counts = y.value_counts()
        for cls, count in class_counts.items():
            self.priors[cls] = np.log(count / total_samples)

        # Menghitung likelihood (P(Xi | C))
        for cls in class_counts.index:
            class_data = X[y == cls]
            for feature in class_data.columns:
                feature_counts = class_data[feature].value_counts()
                total_class_samples = len(class_data)
                for feature_value, count in feature_counts.items():
                    # Log likelihood untuk setiap nilai fitur di kelas tersebut
                    self.likelihoods[cls][(feature, feature_value)] = np.log((count + 1) / (total_class_samples + len(feature_counts)))

    #tidak menggunakan log
    def _calculate_likelihoods(self, X):
        X = pd.DataFrame(X)
        likelihoods = {}
        smoothing = 1e-6  # Smoothing untuk menghindari nol
        for col in X.columns:
            value_counts = X[col].value_counts(normalize=True).to_dict()
            likelihoods[col] = {key: value_counts.get(key, smoothing) for key in value_counts}
        return likelihoods

    
    # menggunakan log
    # def _calculate_likelihoods(self, X):
    #     import pandas as pd
    #     X = pd.DataFrame(X)
    #     likelihoods = {}
    #     for col in X.columns:
    #         likelihoods[col] = X[col].value_counts(normalize=True).to_dict()
    #     return likelihoods
    
    
    def predict(self, X):
        probabilities = self.calculate_probabilities(X)
        predictions = [max(probs, key=probs.get) for probs in probabilities]
        return predictions

    
    #menggunakan log
    # def predict(self, X):
    #     predictions = []
    #     for _, row in X.iterrows():
    #         posterior_probs = {}
    #         for cls in self.priors:
    #             log_posterior = self.priors[cls]  # Mulai dengan prior
                
    #             # Tambahkan log likelihood untuk setiap fitur
    #             for feature, value in row.items():
    #                 if (feature, value) in self.likelihoods[cls]:
    #                     log_posterior += self.likelihoods[cls][(feature, value)]

    #             posterior_probs[cls] = log_posterior

    #         # Pilih kelas dengan probabilitas posterior tertinggi
    #         predicted_class = max(posterior_probs, key=posterior_probs.get)
    #         predictions.append(predicted_class)
        
    #     return predictions

    #tidak menggunakan log
    def calculate_probabilities(self, X):
        probabilities = []
        for row in X:
            row_probs = {}
            total_prob = 0
            for cls in self.classes_:
                posterior = self.priors[cls]
                for col, value in enumerate(row):
                    likelihood = self.likelihoods[cls].get(col, {}).get(value, 1e-6)
                    posterior *= likelihood
                row_probs[cls] = posterior
                total_prob += posterior
            # Normalisasi
            for cls in row_probs:
                row_probs[cls] /= total_prob
            probabilities.append(row_probs)
        return probabilities


    #menggunakan log
    # def calculate_probabilities(self, X):
    #     """
    #     Menghitung probabilitas kelas untuk setiap instance dalam X.
    #     """
    #     X = pd.DataFrame(X)
    #     probabilities = []
    #     for _, row in X.iterrows():
    #         likelihoods = {}
    #         posteriors = {}
    #         for cls in self.priors:
    #             likelihood = {}
    #             posterior = np.log(self.priors[cls])  # Log prior
    #             for col in X.columns:
    #                 value = row[col]
    #                 if value in self.likelihoods[cls].get(col, {}):
    #                     prob = self.likelihoods[cls][col].get(value, 1e-6)
    #                     posterior += np.log(prob)  # Log likelihood
    #                     likelihood[col] = np.log(prob)
    #                 else:
    #                     likelihood[col] = np.log(1e-6)  # Handle unseen values
    #             likelihoods[cls] = likelihood
    #             posteriors[cls] = posterior
    #         probabilities.append({
    #             "class": cls,
    #             "likelihood": likelihoods,
    #             "posterior": posteriors,
    #             "prior": self.priors
    #         })
    #     return probabilities

# Membaca data
data = pd.read_excel('datasiswa.xlsx')

# Pisahkan fitur (X) dan label (y)
X = data.drop('Durasi Mendapat Kerja', axis=1)
y = data['Durasi Mendapat Kerja']

# Inisialisasi dan latih model Naive Bayes
model = NaiveBayesClassifier()
model.train(X, y)

# Prediksi untuk data baru
new_data = pd.DataFrame([['Perempuan', 'OSIS', 'Bahasa', 'Kompeten', 'Sangat Baik', 'Perhotelan', 'Perhotelan']], columns=X.columns)
predictions = model.predict(new_data)

print(predictions)
