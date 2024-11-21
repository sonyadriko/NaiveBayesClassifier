import numpy as np

class NaiveBayesClassifier:
    def __init__(self):
        self.prior_probs = {}
        self.likelihoods = {}
        self.classes = []

    # def train(self, X, y):
    #     """
    #     Latih model dengan data X (fitur) dan y (label).
    #     X adalah list of lists (misalnya fitur data),
    #     y adalah list label.
    #     """
    #     X = np.array(X)  # Mengonversi list ke numpy array
    #     y = np.array(y)  # Mengonversi list ke numpy array

    #     classes = np.unique(y)  # Mendapatkan semua kelas yang unik dari y
    #     num_samples, num_features = X.shape  # Mendapatkan dimensi data

    #     # Hitung probabilitas prior untuk setiap kelas
    #     for cls in classes:
    #         self.prior_probs[cls] = np.sum(y == cls) / num_samples

    #     # Hitung likelihood untuk setiap kelas dan fitur
    #     for cls in classes:
    #         X_cls = X[y == cls]  # Menyaring data fitur berdasarkan kelas
    #         self.likelihoods[cls] = self._calculate_likelihoods(X_cls)
    
    def train(self, X, y):
        """
        Melatih model Naive Bayes dengan data latih X dan label y.
        """
        # Hitung frekuensi kelas
        total_data = len(y)
        class_counts = {}
        
        for cls in y:
            if cls in class_counts:
                class_counts[cls] += 1
            else:
                class_counts[cls] = 1
        
        # Hitung prior untuk setiap kelas
        self.prior_probs = {cls: count / total_data for cls, count in class_counts.items()}
        
        # Hitung likelihood untuk setiap fitur per kelas
        self.likelihoods = {}
        for cls in class_counts:
            # Ambil subset X berdasarkan kelas
            X_cls = [X[i] for i in range(len(y)) if y[i] == cls]
            self.likelihoods[cls] = self._calculate_likelihoods(X_cls)

    # def _calculate_likelihoods(self, X_cls):
    #     """
    #     Menghitung likelihood P(Xi | C) untuk setiap fitur Xi dalam kelas C.
    #     X_cls adalah data fitur yang hanya milik kelas C.
    #     """
    #     num_samples, num_features = X_cls.shape  # Mendapatkan dimensi data kelas

    #     # Menyimpan likelihood untuk setiap fitur
    #     likelihoods = {}
    #     for feature in range(num_features):
    #         # Hitung probabilitas setiap nilai fitur
    #         unique_values = np.unique(X_cls[:, feature])
    #         likelihoods[feature] = {}
    #         for value in unique_values:
    #             # Menghitung likelihood P(Xi | C)
    #             likelihoods[feature][value] = np.sum(X_cls[:, feature] == value) / num_samples
        
    #     return likelihoods
    
    def _calculate_likelihoods(self, X_cls):
        """
        Menghitung likelihood untuk setiap kelas berdasarkan data fitur X_cls.
        """
        num_features = len(X_cls[0])
        likelihoods = {}
        
        for feature_idx in range(num_features):
            feature_values = [x[feature_idx] for x in X_cls]
            unique_values = set(feature_values)
            feature_likelihood = {}
            
            for value in unique_values:
                # Hitung kemungkinan suatu nilai fitur terjadi pada kelas ini
                prob_value = feature_values.count(value) / len(feature_values)
                feature_likelihood[value] = prob_value
            
            likelihoods[feature_idx] = feature_likelihood
        
        return likelihoods

    # def predict(self, X):
    #     """
    #     Menggunakan model yang sudah dilatih untuk melakukan prediksi.
    #     X adalah list of lists (fitur input yang ingin diprediksi).
    #     """
    #     X = np.array(X)  # Mengonversi list ke numpy array
    #     predictions = []

    #     for sample in X:
    #         # Hitung probabilitas posterior untuk setiap kelas
    #         posteriors = {}
    #         for cls in self.prior_probs:
    #             prior = np.log(self.prior_probs[cls])  # Probabilitas prior dalam log
    #             likelihood = 0
    #             for feature_idx, value in enumerate(sample):
    #                 # Menambahkan log likelihood untuk setiap fitur
    #                 if value in self.likelihoods[cls][feature_idx]:
    #                     likelihood += np.log(self.likelihoods[cls][feature_idx][value])
    #                 else:
    #                     likelihood += np.log(1e-6)  # Penanganan jika fitur tidak ditemukan (smoothing)

    #             posteriors[cls] = prior + likelihood  # Posterior = prior + likelihood

    #         # Pilih kelas dengan probabilitas posterior tertinggi
    #         predictions.append(max(posteriors, key=posteriors.get))

    #     return predictions
    # def predict(self, X):
    #     """
    #     Menggunakan model yang sudah dilatih untuk melakukan prediksi.
    #     X adalah list of lists (fitur input yang ingin diprediksi).
    #     """
    #     X = np.array(X)  # Mengonversi list ke numpy array
    #     predictions = []
    #     all_probabilities = []  # Menyimpan probabilitas untuk setiap sample

    #     for sample in X:
    #         # Hitung probabilitas posterior untuk setiap kelas
    #         posteriors = {}
    #         likelihoods = {}
    #         priors = {}
    #         for cls in self.prior_probs:
    #             prior = np.log(self.prior_probs[cls])  # Probabilitas prior dalam log
    #             priors[cls] = prior  # Menyimpan prior untuk kelas ini

    #             likelihood = 0
    #             feature_likelihood = {}
    #             for feature_idx, value in enumerate(sample):
    #                 # Menambahkan log likelihood untuk setiap fitur
    #                 if value in self.likelihoods[cls][feature_idx]:
    #                     feature_likelihood[value] = np.log(self.likelihoods[cls][feature_idx][value])
    #                 else:
    #                     feature_likelihood[value] = np.log(1e-6)  # Penanganan jika fitur tidak ditemukan (smoothing)
    #                 likelihood += feature_likelihood[value]

    #             likelihoods[cls] = feature_likelihood  # Menyimpan likelihood per fitur untuk kelas ini

    #             posteriors[cls] = prior + likelihood  # Posterior = prior + likelihood

    #         # Pilih kelas dengan probabilitas posterior tertinggi
    #         predicted_class = max(posteriors, key=posteriors.get)
            
    #         # Menyimpan hasil prediksi dan nilai probabilitas terkait
    #         all_probabilities.append({
    #             'class': predicted_class,
    #             'prior': priors,
    #             'likelihood': likelihoods,
    #             'posterior': posteriors
    #         })

    #         predictions.append(predicted_class)

    #     return predictions, all_probabilities

    def predict(self, X):
        """
        Menggunakan model yang sudah dilatih untuk melakukan prediksi.
        X adalah list of lists (fitur input yang ingin diprediksi).
        """
        predictions = []
        all_probabilities = []

        for sample in X:
            posteriors = {}
            likelihoods = {}
            priors = {}
            
            for cls in self.prior_probs:
                prior = np.log(self.prior_probs[cls])  # Log prior
                priors[cls] = prior

                likelihood = 0
                feature_likelihood = {}
                for feature_idx, value in enumerate(sample):
                    if value in self.likelihoods[cls][feature_idx]:
                        feature_likelihood[value] = np.log(self.likelihoods[cls][feature_idx][value])
                    else:
                        feature_likelihood[value] = np.log(1e-6)  # Smoothing jika fitur tidak ditemukan
                    likelihood += feature_likelihood[value]

                likelihoods[cls] = feature_likelihood
                posteriors[cls] = prior + likelihood

            predicted_class = max(posteriors, key=posteriors.get)
            
            all_probabilities.append({
                'class': predicted_class,
                'prior': priors,
                'likelihood': likelihoods,
                'posterior': posteriors
            })

            predictions.append(predicted_class)

        return predictions, all_probabilities