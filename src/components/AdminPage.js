// src/components/AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';

const mockUserData = [
    { name: 'User 1', latitude: 22.7128, longitude: 87.0060 },
    { name: 'User 2', latitude: 23.0522, longitude: 86.2437 },
    { name: 'User 1', latitude: 22.565, longitude: 86.29 }

  ];
  
  // Replace the axios call with the following line:
  // setUsers(mockUserData);


const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users' location data (mocked for this example)
    // Replace with actual API call
    // const fetchUserData = async () => {
    //   const response = await axios.get('/api/users'); // Your API endpoint here
    //   setUsers(response.data);
    // };

    setUsers(mockUserData);

    // fetchUserData();
  }, []);

  return (
    <div>
      <h1>Admin Page - User Locations</h1>
      <MapComponent users={users} />
    </div>
  );
};

export default AdminPage;
