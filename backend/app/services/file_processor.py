import pandas as pd
from sklearn.preprocessing import LabelEncoder

label_encoders = {}

def process_file(file):
    """Mengunggah dan memproses file Excel."""
    # Membaca file Excel
    data = pd.read_excel(file, header=0)
    
     # Header baru yang diinginkan
    new_headers = [
        'jenisKelamin', 'organisasi', 'ekstrakurikuler', 
        'sertifikasiProfesi', 'nilaiAkhir', 'tempatMagang', 
        'tempatKerja', 'Durasi Mendapat Kerja'
    ]

    # Pastikan jumlah header baru sesuai dengan jumlah kolom di data
    if len(new_headers) != len(data.columns):
        raise ValueError("Jumlah kolom di file tidak sesuai dengan header yang diharapkan.")

    # Ganti nama kolom
    data.columns = new_headers

    # Label encoding untuk kolom kategori
    global label_encoders
    label_encoders = {}
    for column in data.columns:
        if data[column].dtype == 'object':  # Hanya untuk kolom kategori
            le = LabelEncoder()
            data[column] = le.fit_transform(data[column])
            label_encoders[column] = le
            print(f"Mapping untuk kolom {column}: {dict(zip(le.classes_, le.transform(le.classes_)))}")

    # Menyimpan data yang diproses ke file baru
    processed_file_path = 'proses_data.xlsx'
    data.to_excel(processed_file_path, index=False)
    return processed_file_path

def read_file(file_path):
    """Membaca data dari file Excel dan mengembalikannya dalam format JSON."""
    data = pd.read_excel(file_path)
    return data.to_dict(orient='records')
