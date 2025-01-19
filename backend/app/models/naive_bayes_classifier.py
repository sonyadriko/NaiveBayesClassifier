import numpy as np

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
        
        # Menentukan kelas yang diprediksi
        predicted_class = max(posteriors, key=posteriors.get)

        return predicted_class, posteriors, likelihood_details