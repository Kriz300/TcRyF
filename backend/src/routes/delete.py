from flask import Blueprint, request

# Database
from src.services.db import delete_restaurant

main = Blueprint('delete_blueprint', __name__)

@main.route('/<int:restaurant_id>', methods=["DELETE"])
def delete(restaurant_id):
    if delete_restaurant(str(restaurant_id)):
        return str("deleted"), 200
    else:
        return str("Error"), 500