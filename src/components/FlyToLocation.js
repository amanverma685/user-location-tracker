import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const FlyToLocation = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, 12);  // Zoom to user's location
    }
  }, [center, map]);

  return null;
};

export default FlyToLocation;