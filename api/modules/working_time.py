import pandas as pd
import os
from datetime import datetime

def calculate_mean_working_time(data):
    from api.routes import db, Employee, Performance
    start_time = data['startTime']
    end_time = data['endTime']
    task = data['task']
    employee_name = data['employeeName']
    restaurant = data['restaurantName']

    restaurant_map = {'ra': 'restaurant1', 'rb': 'restaurant2', 'rc': 'restaurant2', 'rd': 'restaurant4'}

    # Read the CSV file into a Pandas dataframe
    filename = f"api/modules/datas/{restaurant_map[restaurant]}.csv"
    filepath = os.path.join(os.getcwd(), filename)
    df = pd.read_csv(filepath)

    # Query the employee by name
    employee = Employee.query.filter_by(name=employee_name).first()
    if employee is None:
        # If the employee does not exist, create a new employee record
        employee = Employee(name=employee_name)
        db.session.add(employee)
        db.session.commit()
    
    # Convert the start and end times to datetime objects
    start_time = datetime.strptime(start_time, '%I:%M %p').time()
    end_time = datetime.strptime(end_time, '%I:%M %p').time()
    arrival = pd.to_datetime(df['Arrival Time'], format='%I:%M:%S %p').dt.time
    
    # Filter the data based on the task and time frame
    filtered_data = df[(arrival >= start_time) & (arrival <= end_time)]
    
    task_name = {'order': 'Order Time', 'picking': 'Pickup Time' }
    # Calculate the mean working time
    mean_working_time = round(filtered_data[task_name[task]].mean(), 2)
    
    # Create a new performance record or update an existing one
    performance = Performance.query.filter_by(employee=employee, task=task, date=datetime.today().date(), restaurant=restaurant).first()
    if performance is None:
        # If the performance record does not exist, create a new record
        performance = Performance(employee=employee, task=task, mean_time=mean_working_time, date=datetime.today().date(), restaurant=restaurant)
        db.session.add(performance)
    else:
        # If the performance record exists, update the mean_time field
        performance.mean_time = mean_working_time
    
    # Commit the changes to the database
    db.session.commit()
    
    # Return the result
    return mean_working_time
