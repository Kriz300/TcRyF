from flask import Blueprint, jsonify, request

main = Blueprint('Hi_blueprint', __name__)

@main.route('/')
def hi():
    return "Hi", 200