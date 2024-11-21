import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder


class NaiveBayesClassifier:
    def __init__(self):
        self.class_probs = {}  # Prior probabilities P(C)
        self.likelihoods = {}   # Likelihood probabilities P(X|C)
        self.classes = None
        self.encoders = {}      # Dictionary to store LabelEncoders for each feature
    
    def train(self, X, y):
        # Print X and y to debug
        print("Initial X:", X.head())  # Displaying first few rows of X
        print("Initial y:", y.head())  # Displaying first few rows of y

        # Convert y to a 1D numpy array if it's a pandas Series or DataFrame
        if isinstance(y, pd.Series):
            y = y.values  # This converts pandas Series to a numpy array

        # Debugging the shape of y
        print(f"y shape after conversion: {y.shape}")


        # Apply LabelEncoder to y if it contains categorical data
        label_encoder = LabelEncoder()
        y_encoded = label_encoder.fit_transform(y)  # Convert categorical y to numerical values
        
        # Debugging the encoded labels
        print("Encoded y:", y_encoded)

        # Save the unique classes (the possible labels)
        self.classes = np.unique(y_encoded)
        print("Classes:", self.classes)

        # Process the feature columns (X) to convert categorical data to numeric
        for column in X.columns:
            if X[column].dtype == 'object':  # Check if feature is categorical
                encoder = LabelEncoder()
                X[column] = encoder.fit_transform(X[column])
                self.encoders[column] = encoder  # Save the encoder for this feature
                print(f"Encoded {column}: {X[column].unique()}")  # Debug the encoded feature

        # Calculate the prior probabilities P(C)
        total_samples = len(y_encoded)
        for cls in self.classes:
            cls_count = (y_encoded == cls).sum()
            self.class_probs[cls] = cls_count / total_samples
            print(f"Class {cls}: Prior Probability P(C) = {self.class_probs[cls]}")

        # Calculate the likelihoods P(X|C) for each feature given the class
        for cls in self.classes:
            class_data = X[y_encoded == cls]  # Get the rows for the current class
            feature_likelihoods = {}
            for column in X.columns:
                feature_likelihoods[column] = {}
                feature_values = class_data[column].unique()  # Unique values for the current feature
                for value in feature_values:
                    likelihood = (class_data[column] == value).sum() / len(class_data)
                    feature_likelihoods[column][value] = likelihood
                print(f"Feature likelihood for {column} given class {cls}: {feature_likelihoods[column]}")

            self.likelihoods[cls] = feature_likelihoods
            print(f"Likelihoods for class {cls}: {self.likelihoods[cls]}")
    
    def calculate_prior(self, cls):
        return self.class_probs.get(cls, 0)
    
    def calculate_likelihood(self, features, cls):
        likelihood = 1
        for feature, value in features.items():
            if value in self.likelihoods[cls][feature]:
                likelihood *= self.likelihoods[cls][feature][value]
            else:
                likelihood *= 1e-6  # Untuk nilai yang tidak ada, kita beri probabilitas kecil
        return likelihood
    
    def calculate_posterior(self, features):
        posteriors = {}
        for cls in self.classes:
            prior = self.calculate_prior(cls)
            likelihood = self.calculate_likelihood(features, cls)
            posterior = prior * likelihood
            posteriors[cls] = posterior
        
        # Normalisasi
        total = sum(posteriors.values())
        for cls in posteriors:
            posteriors[cls] /= total  # Normalisasi
        return posteriors

    def predict(self, features):
        # Transformasi fitur input sesuai encoder
        for column, encoder in self.encoders.items():
            if column in features:
                features[column] = encoder.transform([features[column]])[0]  # Transformasi fitur baru
        
        # Menghitung posterior
        posteriors = self.calculate_posterior(features)
        predicted_class = max(posteriors, key=posteriors.get)  # Ambil kelas dengan probabilitas tertinggi
        return predicted_class  # Hanya mengembalikan kelas yang diprediksi