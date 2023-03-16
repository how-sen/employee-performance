from flask import Blueprint, jsonify
from api.database import db
from api.routes import Performance, Employee

views_bp = Blueprint('views', __name__)

@views_bp.route('/data/<string:employee_name>/<string:task>/<string:restaurant>')
def get_data(employee_name, task, restaurant):
    # Query the database for performances with matching employee name and task
    performances = Performance.query \
        .join(Employee) \
        .filter(Employee.name == employee_name) \
        .filter(Performance.task == task) \
        .filter(Performance.restaurant == restaurant) \
        .all()

    # Return the performances as a JSON response
    return jsonify([p.serialize() for p in performances])