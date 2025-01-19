import pandas as pd
from sklearn.preprocessing import LabelEncoder

label_encoders = {}

def process_file(file):
    """Mengunggah dan memproses file Excel."""
    # Membaca file Excel
    data = pd.read_excel(file)

    # Label encoding untuk kolom kategori
    global label_encoders
    label_encoders = {}
    for column in data.columns:
        if data[column].dtype == 'object':  # Hanya untuk kolom kategori
            le = LabelEncoder()
            data[column] = le.fit_transform(data[column])
            label_encoders[column] = le

    # Menyimpan data yang diproses ke file baru
    processed_file_path = 'proses_data.xlsx'
    data.to_excel(processed_file_path, index=False)
    return processed_file_path

def read_file(file_path):
    """Membaca data dari file Excel dan mengembalikannya dalam format JSON."""
    data = pd.read_excel(file_path)
    return data.to_dict(orient='records')
