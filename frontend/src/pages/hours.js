import React, { useState } from 'react';
import Select from 'react-select';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import style from './hours.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUrl } from '../redux/actions';

const Hours = () => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [task, setTask] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const taskList = [
        { value: 'order', label: 'Taking Orders'},
        { value: 'picking', label: 'Picking Up Food'}
    ];
    const restaurantList = [
        { value: 'ra', label: 'Restaurant A'},
        { value: 'rb', label: 'Restaurant B'},
        { value: 'rc', label: 'Restaurant C'},
        { value: 'rd', label: 'Restaurant D'}
    ];
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            startTime: startTime && startTime.format('h:mm a'),
            endTime: endTime && endTime.format('h:mm a'),
            task,
            employeeName,
            restaurantName
        };
        saveData(data);
    };

    const handleTaskChange = e => {
        setTask(e.value);
    };
    const handleEmployeeNameChange = e => {
        setEmployeeName(e.target.value);
    };

    const handleRestaurantNameChange = e => {
        setRestaurantName(e.value);
    };

    const saveData = async (data) => {
        axios.post("http://127.0.0.1:5000/data", data).then(function (response) {
            const url = response.data.data_url;
            dispatch(setUrl(url));
            window.location.href = "http://localhost:3000/performance";
        }).catch(function(error){
            if (error.response) {
                console.log(error.response.data);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
        })
    }

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.inputContainer}>
                <label htmlFor="employee-name" className={style.label}>
                    Employee Name:
                </label>
                <input
                    id="employee-name"
                    type="text"
                    value={employeeName}
                    onChange={handleEmployeeNameChange}
                    className={style.input}
                />
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="restaurant-name" className={style.label}>
                    Restaurant Name:  
                </label>
                <Select
                    id="estaurant-name"
                    value={restaurantList.value}
                    onChange={handleRestaurantNameChange}
                    className={style.select}
                    options={restaurantList}
                    defaultValue={{label:"-- Select a Restaurant --", value: ""}}
                >
                </Select>
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="start-time" className={style.label}>
                    Start Time: 
                </label>
                <TimePicker
                    id="start-time"
                    showSecond={false}
                    defaultValue={null}
                    onChange={setStartTime}
                    format="h:mm a"
                    use12Hours
                    inputReadOnly
                    className={style.select}
                />
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="end-time" className={style.label}>
                    End Time: 
                </label>
                <TimePicker
                    id="end-time"
                    showSecond={false}
                    defaultValue={null}
                    onChange={setEndTime}
                    format="h:mm a"
                    use12Hours
                    inputReadOnly
                    className={style.select}
                />
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="task" className={style.label}>
                    Task: 
                </label>
                <Select
                    id="task"
                    value={task.value}
                    onChange={handleTaskChange}
                    className={style.select}
                    options={taskList}
                    defaultValue={{label:"-- Select a Task --", value: ""}}
                >
                </Select>
            </div>
            <button type="submit" className={style.button}>Submit</button>
        </form>
    );
};

export default Hours;
