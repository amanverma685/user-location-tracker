import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchBar from './SearchBar';  // The search bar component

// Fixing default marker icon issues in Leaflet with Webpack
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const { BaseLayer } = LayersControl;

// Haversine formula to calculate distance
const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;

  const lat1 = coords1[0];
  const lon1 = coords1[1];
  const lat2 = coords2[0];
  const lon2 = coords2[1];

  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const MapComponent = ({ users }) => {
  const [adminLocation, setAdminLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);  // Track selected user location
  const [selectedUser, setSelectedUser] = useState(null);  // Track selected user for distance

  const defaultCenter = [22.8046, 86.2029];  // Jamshedpur, India

  // Get admin's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAdminLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error retrieving admin location:', error);
        }
      );
    }
  }, []);

  // FlyToLocation Component (useMap hook to control map)
  const FlyToLocation = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.flyTo(center, 12, { duration: 2 }); // Fly to selected location with smooth animation
      }
    }, [center, map]);
    return null;
  };

  // Handle user selection from the search bar
  const handleUserSelect = (user) => {
    setSelectedLocation([user.latitude, user.longitude]);  // Set location of selected user
    setSelectedUser(user);  // Set selected user for distance calculation
  };

  // Fly to admin's current location
  const flyToAdminLocation = () => {
    setSelectedLocation(adminLocation);
  };

  // Calculate distance between admin and selected user
  const distanceToSelectedUser = adminLocation && selectedLocation
    ? haversineDistance(adminLocation, selectedLocation).toFixed(2) // Round to 2 decimal places
    : null;

  return (
    <div>
      <SearchBar users={users} onUserSelect={handleUserSelect} />  {/* Search bar on top of map */}
      <MapContainer center={defaultCenter} zoom={12} style={{ height: "100vh", width: "100vw" }}>
        <LayersControl position="topright">
          <BaseLayer checked name="Political View (OSM)">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </BaseLayer>

          <BaseLayer name="Satellite View">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, USGS, NASA'
            />
          </BaseLayer>
        </LayersControl>

        {/* Markers for users */}
        {users.map((user, index) => (
          <Marker key={index} position={[user.latitude, user.longitude]}>
            <Popup>
              {user.name}
              {adminLocation && (
                <>
                  <br />
                  {user.name === selectedUser?.name && distanceToSelectedUser && (
                    <span>Distance: {distanceToSelectedUser} km</span>
                  )}
                </>
              )}
            </Popup>
          </Marker>
        ))}

        {/* Admin's Current Location */}
        {adminLocation && (
          <Marker position={adminLocation}>
            <Popup>You are here (Admin)</Popup>
          </Marker>
        )}

        {/* Fly to selected user location when chosen from dropdown */}
        {selectedLocation && <FlyToLocation center={selectedLocation} />}

        {/* Button to Fly to Admin's Location */}
        <button
          onClick={flyToAdminLocation}
          style={{
            position: 'absolute',
            left: '20px',
            bottom: '20px',
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          Go to Current Location
        </button>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
