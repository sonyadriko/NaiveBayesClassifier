import os
import pandas as pd
from flask import Blueprint, jsonify

bp = Blueprint('data', __name__, url_prefix='/data')

# Lokasi file Excel
DATA_PATH = os.path.join(os.path.dirname(__file__), '../../datasiswa.xlsx')

@bp.route('/read', methods=['GET'])
def read_data():
    try:
        # Membaca file Excel
        df = pd.read_excel(DATA_PATH)
        
        # Konversi DataFrame ke list of dict
        data = df.to_dict(orient='records')
        
        return jsonify({
            "success": True,
            "data": data
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400
