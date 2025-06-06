from flask_restx import Namespace, Resource, fields
from flask import request
from app.services.file_processor import process_file
import pandas as pd

# Define the Namespace for upload
ns = Namespace('upload', description='Upload file untuk diproses')

upload_response = ns.model('UploadResponse', {
    'message': fields.String(required=True, description='Hasil upload file')
})

@ns.route('/')
class UploadFile(Resource):
    @ns.doc('upload_file')
    @ns.response(200, 'File berhasil diproses', upload_response)
    @ns.response(400, 'Kesalahan saat mengunggah file')
    def post(self):
        """Mengunggah file Excel untuk diproses"""
        if 'file' not in request.files:
            return {"message": "No file part"}, 400
        
        file = request.files['file']

        if file.filename == '':
            return {"message": "No selected file"}, 400

        if file and (file.filename.endswith('.xls') or file.filename.endswith('.xlsx')):
            try:
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
                
                upload_path = 'data.xlsx'
                data.to_excel(upload_path, index=False, sheet_name='Sheet1')
                
                upload_path = process_file(file)
                return {"message": f"File berhasil diproses dan disimpan di {upload_path}"}, 200
            except Exception as e:
                return {"message": str(e)}, 400
        else:
            return {"message": "Format file tidak valid. Hanya mendukung .xls dan .xlsx"}, 400
