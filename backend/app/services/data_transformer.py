import numpy as np
from app.services.file_processor import label_encoders

# label_encoders = {}

def convert_data(input_data):
    """Mengonversi data kategori menggunakan LabelEncoder."""
    converted_data = {}
    for key, value in input_data.items():
        if key in label_encoders:
            converted_data[key] = label_encoders[key].transform([value])[0]
        else:
            converted_data[key] = value
    return convert_to_serializable(converted_data)

def convert_to_serializable(data):
    """Konversi objek data ke tipe yang bisa diserialisasi oleh JSON (int, float, str, bool, None) 
    dan membatasi angka desimal menjadi maksimal 4 angka di belakang koma."""
    if isinstance(data, dict):
        return {str(key): convert_to_serializable(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [convert_to_serializable(item) for item in data]
    elif isinstance(data, np.ndarray):
        return data.tolist()
    elif isinstance(data, (np.int64, np.int32)):
        return int(data)
    elif isinstance(data, (np.float64, np.float32, float)):
        # Batasi float hingga 4 angka di belakang koma
        return round(float(data), 4)
    else:
        return data
