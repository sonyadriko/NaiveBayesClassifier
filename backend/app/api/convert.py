from flask_restx import Namespace, Resource, fields
from flask import request
from app.services.data_transformer import convert_data

# Define the Namespace for convert
convert_ns = Namespace('convert', description='Konversi data menggunakan LabelEncoder')

convert_response = convert_ns.model('ConvertResponse', {
    'converted_data': fields.Raw(description='Data yang telah dikonversi')
})

@convert_ns.route('/')
class ConvertData(Resource):
    @convert_ns.doc('convert_data')
    @convert_ns.expect(convert_ns.model('ConvertRequest', {
        'input_data': fields.Raw(required=True, description='Data untuk dikonversi')
    }))
    @convert_ns.response(200, 'Data berhasil dikonversi', convert_response)
    @convert_ns.response(400, 'Kesalahan saat konversi data')
    def post(self):
        """Mengonversi data kategori ke angka"""
        input_data = request.get_json()
        try:
            converted_data = convert_data(input_data)
            return {"converted_data": converted_data}, 200
        except Exception as e:
            return {"error": str(e)}, 400

# Export the namespace so it can be imported and registered in app/__init__.py
