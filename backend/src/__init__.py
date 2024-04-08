#Basic imports
from flask import Flask
from flask_cors import CORS

# Routes
from .routes import index, delete, update, insert, filters

app = Flask(__name__)
CORS(app)


def init_app():
    # Blueprints
    app.register_blueprint(index.main, url_prefix='/index')
    app.register_blueprint(filters.main, url_prefix='/filters')
    app.register_blueprint(insert.main, url_prefix='/insert')
    app.register_blueprint(update.main, url_prefix='/update')
    app.register_blueprint(delete.main, url_prefix='/delete')

    return app
"""
from flask import Flask, request
from werkzeug.exceptions import BadRequest

from services import db_connect.get_d

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['DEBUG'] = True

@app.route('/')
def hash_text():
    return "Hi"

@app.route('/api/v1/company/', methods=["GET","POST", "PUT","DELETE"])
def company():
    conn = get_db_connection()
    if request.method == 'GET':
        company_api_key  = request.args.get('company_api_key', None)
        if company_api_key == "all":
            posts = conn.execute('SELECT * FROM Company').fetchall()#Lista
        else:
            posts = conn.execute('SELECT * FROM Company WHERE company_api_key= ?', (company_api_key,)).fetchone()#Lista
        conn.close()
        return str(posts), 200

"""