'use client'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Today from './today/page';
import Yesterday from './yesterday/page';
import Weekly from './weekly/page';
import Month from './month/page';
import UnitAlerts from './unitalerts/page';

const Dashboard = () => {

  // const [data, setData] = useState([])
  // const { accountURL } = useContext(AuthContext)
  // const token = localStorage.getItem('token');
  // const token = '72dbf14411791344bbd2044ff82473c2e58e72b5'
  // useEffect(() => {
  //   axios.get(`https://rpos.pythonanywhere.com/api/v1/dashboard/`, {
  //     headers: { 'Authorization': 'token ' + token }
  //   })
  //     .then((res) => {
  //       setData(res.data);
  //       console.log( res.data);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  // console.log("dash" + data)

  const [data, setData] = useState([]);

  // UseEffect hook to fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = '72dbf14411791344bbd2044ff82473c2e58e72b5';
        const response = await axios.get('https://rpos.pythonanywhere.com/api/v1/dashboard/', {
          headers: { 'Authorization': 'token ' + token }
        });
        // Assuming response.data is an array, update the state with response data
        setData(response.data);
        console.log('Dashboard data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])


  return (
    <div className='p-5'>
      <div>
        <Today data={data}></Today>
        <Yesterday data={data}></Yesterday>
        <Weekly data={data}></Weekly>
        <Month data={data}></Month>
        <UnitAlerts data={data}></UnitAlerts>
      </div>
    </div>
  );
};

export default Dashboard;