#Basic imports
from flask import Blueprint, jsonify

#Components
from src.services.db import get_db_connection

main = Blueprint('index_blueprint', __name__)

#Path for load database info in table
@main.route('/')
def index():
    conn = get_db_connection()
    resturants = conn.execute('SELECT * FROM restaurant').fetchall()#List
    conn.close()
    return jsonify(resturants), 200