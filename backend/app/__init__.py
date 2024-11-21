from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your_secret_key'

    # Register routes
    from .routes import predict, data
    app.register_blueprint(predict.bp)
    app.register_blueprint(data.bp)

    return app
