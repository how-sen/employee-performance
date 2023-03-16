import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import style from './hours.module.css';

function Performance({ url }) {
  const [data, setData] = useState([]);

  useEffect(()=>{
    axios.get(url).then(function (response) {
            console.log(response.data)
            setData(response.data)
          }).catch(function (error) {
              console.log(error);
          });
  }, [url])


  // get target employee's name
  const setUrl = new URL(url).searchParams;
  const targetName = setUrl.get('employee_name');
  // Prepare data for the chart with same employee but different dates
  const targetData = data.filter(item => item.employee === targetName);
  const dataSameEmployee = {
    label: targetName,
    data: targetData.map(item => ({
      x: item.date,
      y: item.mean_time
    })),
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1
  };
  // Prepare data for the chart with all the employees who worked on this task before 
  const groupedData = {};
  data.forEach(item => {
    if (!groupedData[item.employee] || item.date > groupedData[item.employee].date) {
      groupedData[item.employee] = item;
    }
  });
  const dataAllEmployees = Object.keys(groupedData).map(key => {
    const item = groupedData[key];
    const employeeData = {
      label: item.employee,
      data: [{ x: item.employee, y: item.mean_time }],
    };
    return employeeData;
  });
  const labelsAllEmployees = Object.keys(groupedData).map(key => groupedData[key].employee);

  return (
    <div className={style.App}>
        <div>
          <h3>Chart Compare</h3>
          <Bar
            data={{
              labels: dataSameEmployee.data.map(item => item.x),
              datasets: [dataSameEmployee],
            }}
            height={400}
            width={600}
          />
        </div>
        <div>
          <h3>Chart History</h3>
          <Bar
            data={{
              labels: labelsAllEmployees,
              datasets: dataAllEmployees.map((data, index) => ({
                label: data.label,
                data: data.data,
                backgroundColor: `rgba(${index * 50}, ${255 - index * 50}, 0, 0.5)`,
                borderColor: `rgba(${index * 50}, ${255 - index * 50}, 0, 1)`,
                borderWidth: 1
              }))
            }}
            height={400}
            width={600}
          />
        </div>
    </div>
  );
}

const mapStateToProps = state => ({
  url: state.url,
});

export default connect(mapStateToProps)(Performance);

