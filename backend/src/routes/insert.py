#Basic imports
from flask import Blueprint, request

#Components
from src.services.db import insert_restaurant

main = Blueprint('insert_blueprint', __name__)

#Path for insert elements in database
@main.route('/', methods=["POST"])
def insert():
    restaurant_name = request.form.get('restaurant_name', None)
    restaurant_locate = request.form.get('restaurant_locate', None)
    restaurant_food = request.form.get('restaurant_food', None)
    restaurant_score = request.form.get('restaurant_score', None)
    restaurant_visited = request.form.get('restaurant_visited', None)
    if insert_restaurant(restaurant_name, restaurant_locate, restaurant_food, restaurant_score, restaurant_visited):
        return str("insert"), 200
    else:
        return str("Error"), 500