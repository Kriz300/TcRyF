from flask import Blueprint, request, jsonify

# Database
from src.services.db import get_db_connection

main = Blueprint('filters_blueprint', __name__)

@main.route('/', methods=["POST"])
def insert():
    restaurant_locate = request.form.get('restaurant_locate')
    restaurant_food = request.form.get('restaurant_food')
    restaurant_score = request.form.get('restaurant_score')

    query = "SELECT * FROM restaurant WHERE "
    
    if restaurant_locate:
        query = query + "locate LIKE '%' || " + restaurant_locate + " || '%'"

        if restaurant_food:
            query = query + "AND food LIKE '%' || " + restaurant_food + " || '%'"

            if restaurant_score:
                query = query + "AND score > " + restaurant_score + ""
        
        else:
            if restaurant_score:
                query = query + "AND score > " + restaurant_score + ""
    else:
        if restaurant_food:
            query = query + "food LIKE '%' || " + restaurant_food + " || '%'"

            if restaurant_score:
                query = query + "AND score > " + restaurant_score + ""
        
        else:
            if restaurant_score:
                query = query + "score > " + restaurant_score + ""
            else:
                return str("Nada que filtrar"), 200

    conn = get_db_connection()
    try:
        resturants = conn.execute(query).fetchall()#List
        conn.close()
        return jsonify(resturants), 200
    except:
        conn.close()
        return jsonify([]), 200