from flask import Flask
from flask_restx import Api
from flask_cors import CORS
from app.api.upload import ns as upload_ns
from app.api.convert import convert_ns
from app.api.read_data import read_data_ns
from app.api.predict import predict_bp
from app.api.get_labels import get_labels_bp
from app.api.evaluate import evaluate_ns
from app.api.auth import auth_ns
from app.api.rud_user import user_ns
from flask_jwt_extended import JWTManager
from app.extensions import init_extensions  # Impor init_extensions

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    app.url_map.strict_slashes = False
    
    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = ''
    app.config['MYSQL_DB'] = 'naive_bayes'
    
    # Konfigurasi JWT
    app.config['JWT_SECRET_KEY'] = '81ae040e5f603e358221379899b5ebe29d747b4f8338f3c6bec05558a41af1b2a5fcfa726c37151572689603df51cc494139d91e86aa462c150f8f5c6a2a2c78c36cc96bf3c898076af43d2dc3d2e352b7de6cb88722870266686377ba47a180aa5ffb8ade44751e1c0536e5af46150237771cdd69e4c9a85450f1e1db7263bfd5554ef3d73ec960bd15a4e02f3441ff6ddea02489ae30563227d22e7a15b92d0e66606f9e91174a5e692218df3e1cb3bac879cbcf329b88496fcf84dd18db84616b1cf360b77807746eabe10296c5af0be6bc657f7ad4691e24e2c7114cac8bc0068c60cf4f62580417966d4565d35903203fda94fba52b5a921591c7fb13f9'
    jwt = JWTManager(app)
    
    # Initialize extensions
    init_extensions(app)

    # Initialize the Flask-RestX API object
    api = Api(app)
    
    # Register namespaces with API
    api.add_namespace(upload_ns, path='/upload')
    api.add_namespace(convert_ns, path='/convert')
    api.add_namespace(read_data_ns, path='/read')
    api.add_namespace(predict_bp, path='/predict')
    api.add_namespace(get_labels_bp, path='/get_labels')
    api.add_namespace(evaluate_ns, path='/evaluate')
    api.add_namespace(auth_ns, path='/auth')
    api.add_namespace(user_ns, path='/users')

    return app
