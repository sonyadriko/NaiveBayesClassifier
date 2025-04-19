import numpy as np
import pandas as pd

class NaiveBayesClassifier:
    def __init__(self):
        self.class_probs = {}  # Probabilitas prior P(C)
        self.likelihoods = {}  # Probabilitas likelihood P(X|C)
        self.classes = None  # Kelas yang ada

    def train(self, X, y):
        """Melatih model Naive Bayes dengan data fitur X dan label y."""
        self.classes = np.unique(y)
        total_samples = len(y)

        print("Training Naive Bayes Classifier...")
        print(f"Total samples: {total_samples}")
        
        # Hitung prior probabilities P(C)
        for cls in self.classes:
            cls_count = (y == cls).sum()
            self.class_probs[cls] = cls_count / total_samples
            print(f"Prior P({cls}) = {self.class_probs[cls]}")

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
                    print(f"P({value}|{cls}) = {likelihood} (for feature {column})")
            self.likelihoods[cls] = feature_likelihoods

    def predict(self, features):
        """Memprediksi kelas untuk satu set fitur."""
        print("\nPredicting class for given features...")
        posteriors = {}
        likelihood_details = {}
        
        for cls in self.classes:
            prior = self.class_probs.get(cls, 0)  # Probabilitas prior P(C)
            likelihood = 1
            feature_likelihoods = {}

            print(f"\nClass {cls}:")
            print(f"Prior P({cls}) = {prior}")
            
            # Hitung likelihood P(X|C)
            for feature, value in features.items():
                if feature in self.likelihoods[cls] and value in self.likelihoods[cls][feature]:
                    likelihood_value = self.likelihoods[cls][feature][value]
                    print(f"Likelihood P({value}|{cls}) = {likelihood_value}")
                else:
                    likelihood_value = 1e-6  # Jika nilai tidak ditemukan, gunakan probabilitas kecil
                    print(f"Likelihood P({value}|{cls}) = {likelihood_value} (using small probability for unknown value)")
                feature_likelihoods[feature] = likelihood_value
                likelihood *= likelihood_value

            # Hitung posterior tanpa normalisasi
            posteriors[cls] = prior * likelihood
            likelihood_details[cls] = feature_likelihoods
            print(f"Posterior (without normalization) for class {cls} = {posteriors[cls]}")

        # Normalisasi posterior untuk mendapatkan probabilitas posterior
        evidence = sum(posteriors.values())
        normalized_posteriors = {cls: posterior / evidence for cls, posterior in posteriors.items()}

        # Prediksi kelas dengan probabilitas posterior tertinggi
        predicted_class = max(normalized_posteriors, key=normalized_posteriors.get)
        print(f"Normalized posteriors: {normalized_posteriors}")
        print(f"Predicted class: {predicted_class}")

        return predicted_class, normalized_posteriors, likelihood_details, evidence
