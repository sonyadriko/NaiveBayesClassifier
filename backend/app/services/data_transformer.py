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
    """Konversi objek data ke tipe yang bisa diserialisasi oleh JSON (int, float, str, bool, None)."""
    if isinstance(data, dict):
        return {str(key): convert_to_serializable(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [convert_to_serializable(item) for item in data]
    elif isinstance(data, np.ndarray):
        return data.tolist()
    elif isinstance(data, (np.int64, np.float64)):
        return int(data) if isinstance(data, np.int64) else float(data)
    else:
        return data 