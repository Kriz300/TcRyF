from flask import Blueprint, request

# Database
from src.services.db import update_restaurant

main = Blueprint('update_blueprint', __name__)

@main.route('/', methods=["PUT"])
def update():
    restaurant_id = request.form.get('restaurant_id', None)
    restaurant_name = request.form.get('restaurant_name', None)
    restaurant_locate = request.form.get('restaurant_locate', None)
    restaurant_food = request.form.get('restaurant_food', None)
    restaurant_score = request.form.get('restaurant_score', None)
    restaurant_visited = request.form.get('restaurant_visited', None)
    if update_restaurant(restaurant_id, restaurant_name, restaurant_locate, restaurant_food, restaurant_score, restaurant_visited):
        return str("update"), 200
    else:
        return str("Error"), 500