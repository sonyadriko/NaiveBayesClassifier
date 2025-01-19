from flask import Flask
from flask_restx import Api
from flask_cors import CORS
from app.api.upload import ns as upload_ns
from app.api.convert import convert_ns
from app.api.read_data import read_data_ns
from app.api.predict import predict_bp
from app.api.get_labels import get_labels_bp
from app.api.evaluate import evaluate_ns

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    app.url_map.strict_slashes = False

    # Initialize the Flask-RestX API object
    api = Api(app)
    # Register namespaces with API
    api.add_namespace(upload_ns, path='/upload')
    api.add_namespace(convert_ns, path='/convert')
    api.add_namespace(read_data_ns, path='/read')
    api.add_namespace(predict_bp, path='/predict')
    api.add_namespace(get_labels_bp, path='/get_labels')
    api.add_namespace(evaluate_ns, path='/evaluate')

    return app
