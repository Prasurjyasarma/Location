// import React from 'react';
// import { Marker } from 'react-map-gl';

// const MarkerComponent = ({ marker, setSelectedMarker }) => {
//   return (
//     <Marker
//       longitude={marker.lngLat[0]}
//       latitude={marker.lngLat[1]}
//       anchor="bottom"
//       onClick={() => setSelectedMarker(marker)}
//     >
//       <img src={marker.image} alt={marker.name} style={{ height: '80px', width: '80px' }} />
//     </Marker>
//   );
// };

// export default MarkerComponent;


import React from 'react';
import { Marker } from 'react-map-gl';

const MarkerComponent = ({ marker, setSelectedMarker }) => {
  return (
    <Marker
      longitude={marker.lngLat[0]}
      latitude={marker.lngLat[1]}
      anchor="bottom"
      onClick={() => setSelectedMarker(marker)}
    >
      <img src={marker.image} alt={marker.name} style={{ height: '80px', width: '80px' }} />
    </Marker>
  );
};

export default MarkerComponent;
