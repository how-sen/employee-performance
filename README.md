# Employee Performance Monitoring App
This application collects data from four different restaurants on the same date to track and monitor employee efficiency. You can access the data collection form at http://localhost:3000/hours.

Once you enter the necessary information, the backend will calculate and store the average time each employee spends on a specific task based on the data you provide. The backend will then send back the data related to the selected user, and the frontend will display two charts:

The first chart compares the historic data of the employee's task completion time at the current restaurant.
The second chart compares the task completion time of all employees who worked at the same restaurant on the same task (with the latest date selected if multiple dates are available).
This allows restaurant managers to compare employee performance within the same restaurant and task type, minimizing the influence of environmental factors such as location and customer type.

While there is room for improvement, such as adding error handling to the data collection form and comparing employee behavior with the overall average for the entire CSV file, only the essential features have been implemented due to time constraints.

I used several helper packages to expedite the implementation process, which are not my preferred choices in a real-world scenario. 

The time required to set up the project's basics was not factored into the 5-hour time limit.

Steps to clone the project

in root dirctory:

```pip install -r requirements.txt```

```flask run```

(You want to make sure that you are running the backend on http://127.0.0.1:5000)

switch to another terminal window

```cd frontend/```

```npm i```

```npm start```

Go on http://localhost:3000/hours and you can start to interact with the application
