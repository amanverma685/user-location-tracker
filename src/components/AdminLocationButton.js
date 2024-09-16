// src/components/AdminLocationButton.js
import React from 'react';

const AdminLocationButton = ({ onClick }) => {
  return (
    <div className="admin-location-button">
      <button onClick={onClick}>View My Location</button>

      {/* CSS Styling */}
      <style>{`
        .admin-location-button {
          position: absolute;
          bottom: 20px;
          left: 20px;
          z-index: 1000;
        }

        button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default AdminLocationButton;
