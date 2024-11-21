import pandas as pd
from sklearn.preprocessing import LabelEncoder

def preprocess_data(input_data):
    # Konversi input_data menjadi DataFrame
    df = pd.DataFrame([input_data])

    # Lakukan encoding untuk kolom kategorikal (misal: 'Jenis Kelamin', 'Organisasi', dll)
    label_encoder = LabelEncoder()
    categorical_columns = ['Jenis Kelamin', 'Organisasi', 'Ekstrakurikuler', 'Sertifikasi Profesi', 'Tempat Magang']
    
    # Periksa apakah kolom ada sebelum melakukan encoding
    for col in categorical_columns:
        if col in df.columns:
            df[col] = label_encoder.fit_transform(df[col])

    # Pastikan hasilnya adalah array atau list untuk diteruskan ke model
    features = df.values.tolist()  # Mengubah numpy.ndarray menjadi list biasa
    
    return features
