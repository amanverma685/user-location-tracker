// src/App.js
import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import SearchBar from './components/SearchBar';

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const users = [
    { name: 'User 1', latitude: 40.7128, longitude: -74.0060 },  // New York
    { name: 'User 2', latitude: 22.5726, longitude: 88.3639 },    // Kolkata
    { name: 'User 3', latitude: 23.0225, longitude: 72.5714 },    // Ahmedabad
    { name: 'User 4', latitude: 19.0760, longitude: 72.8777 },    // Mumbai
  ];

  const handleUserClick = (location) => {
    setSelectedLocation(location);  // Zoom to the selected user's location
  };

  const handleUserSelectFromSearch = (user) => {
    setSelectedLocation([user.latitude, user.longitude]);  // Zoom to the selected user's location from search
  };

  return (
    <div>
      {/* SearchBar component */}
      <SearchBar users={users} onUserSelect={handleUserSelectFromSearch} />

      {/* MapComponent with selected location */}
      <MapComponent
        users={users}
        selectedLocation={selectedLocation}
        onUserClick={handleUserClick}  // Handle marker click
      />
    </div>
  );
};

export default App;
