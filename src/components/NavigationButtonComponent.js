import mapboxgl from 'mapbox-gl';
import { useRef, useEffect } from 'react';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

const mapboxToken = 'your_mapbox_token_here'; // Ensure you replace this with your Mapbox token

const NavigationButtonComponent = ({ start, end }) => {
    const mapContainerRef = useRef(null);
  
    const startNavigation = () => {
      if (!start || !end) {
        console.error('Invalid start or end coordinates:', { start, end });
        return;
      }
  
      if (mapContainerRef.current) {
        mapboxgl.accessToken = mapboxToken;
  
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: start,
          zoom: 15,
        });
  
        map.addControl(new mapboxgl.NavigationControl());
  
        const directions = new MapboxDirections({
          accessToken: mapboxToken,
          unit: 'metric',
          profile: 'mapbox/walking',
        });
  
        directions.setOrigin(start);
        directions.setDestination(end);
  
        map.addControl(directions, 'top-left');
      }
    };
  
    useEffect(() => {
      if (start && end) {
        startNavigation(); // Only start navigation when both start and end are available.
      }
    }, [start, end]);
  
    return (
      <div ref={mapContainerRef} style={{ height: '100px', width: '100%' }}>
        {/* The map will be rendered inside this div */}
      </div>
    );
  };
  

export default NavigationButtonComponent;
