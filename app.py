from flask import Flask, send_from_directory
# from flask_cors import CORS
from api.routes import api_bp
from api.database import db
from api.modules.view import views_bp

app = Flask(__name__)
# CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///staff_performance.db'
app.static_folder = 'frontend/build'

db.init_app(app)
app.register_blueprint(api_bp)
app.register_blueprint(views_bp)

@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
