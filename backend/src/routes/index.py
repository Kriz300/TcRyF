from flask import Blueprint, jsonify

# Database
from src.services.db import get_db_connection

main = Blueprint('index_blueprint', __name__)

@main.route('/')
def index():
    conn = get_db_connection()
    resturants = conn.execute('SELECT * FROM restaurant').fetchall()#List
    conn.close()
    return jsonify(resturants), 200