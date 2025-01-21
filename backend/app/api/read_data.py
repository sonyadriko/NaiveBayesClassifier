from flask_restx import Namespace, Resource
from app.services.file_processor import read_file

read_data_ns = Namespace('read', description='Membaca data dari file Excel')

@read_data_ns.route('/')
class ReadData(Resource):
    @read_data_ns.doc('read_data')
    @read_data_ns.response(200, 'Data berhasil dibaca')
    @read_data_ns.response(400, 'Kesalahan saat membaca data')
    def get(self):
        """Membaca data dari file Excel"""
        try:
            data = read_file('data.xlsx')
            return {"data": data}, 200
        except Exception as e:
            return {"error": str(e)}, 400
