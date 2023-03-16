from flask import Blueprint, request, jsonify
from flask_restful import Api
from api.modules.working_time import calculate_mean_working_time
from api.database import db

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class Performance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    employee = db.relationship('Employee', backref=db.backref('performances', lazy=True))
    task = db.Column(db.String(50), nullable=False)
    mean_time = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)
    restaurant = db.Column(db.String(50), primary_key=False)

@api_bp.route('/data', methods=['POST'])
def receive_data():
    data = request.get_json()  # Get the data sent as JSON
    calculate_mean_working_time(data)
    # Build URL to retrieve relevant data
    url = f"https://employee-performancee.herokuapp.com/data?employee_name={data['employeeName']}&task={data['task']}&restaurant={data['restaurantName']}"
    # Send response to client
    return jsonify({'success': True, 'data_url': url})

@api_bp.route('/data', methods=['GET'])
def get_data():
    task = request.args.get('task')
    restaurant = request.args.get('restaurant')
    # Query the database for relevant data
    performances = Performance.query.filter_by(task=task, restaurant=restaurant).join(Employee).all()
    # Build response data
    data = []
    for performance in performances:
        data.append({
            'employee': performance.employee.name, 
            'task': performance.task,
            'mean_time': performance.mean_time, 
            'date': performance.date
        })
    # Send response to client
    return jsonify(data)

