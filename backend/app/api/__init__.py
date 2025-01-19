from flask import Flask
from flask_restx import Api
from app.api.upload import ns as upload_ns
from app.api.convert import convert_ns
from app.api.read_data import read_data_ns
from app.api.predict import predict_bp
from app.api.get_labels import get_labels_bp

# This is where the API Blueprint is set up
def create_app():
    app = Flask(__name__)

    # Initialize the Flask-RestX API object
    api = Api(app)

    # Register namespaces with API
    api.add_namespace(upload_ns, path='/upload')
    api.add_namespace(convert_ns, path='/convert')
    api.add_namespace(read_data_ns, path='/read')
    api.add_namespace(predict_bp, path='/predict')
    api.add_namespace(get_labels_bp, path='/get_labels')

    return app
