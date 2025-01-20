from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt

# Inisialisasi ekstensi global
mysql = MySQL()
bcrypt = Bcrypt()

def init_extensions(app):
    # Aktifkan CORS
    CORS(app)

    # Konfigurasi Swagger
    SWAGGER_URL = '/swagger'
    API_DOC_URL = '/static/swagger.json'
    swagger_ui = get_swaggerui_blueprint(SWAGGER_URL, API_DOC_URL)
    app.register_blueprint(swagger_ui, url_prefix=SWAGGER_URL)
    
    # Inisialisasi ekstensi lain
    mysql.init_app(app)
    bcrypt.init_app(app)
