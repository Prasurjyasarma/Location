// import React, { useState } from 'react';
// import '../styles/SearchBarComponent.css'; // Ensure you create this CSS file for styling

// const SearchBarComponent = ({ markers, setFilteredMarkers, setViewport }) => {
//   const [query, setQuery] = useState('');

//   const handleSearch = (e) => {
//     setQuery(e.target.value);
//     const filtered = markers.filter(marker =>
//       marker.name.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setFilteredMarkers(filtered);

//     if (filtered.length > 0) {
//       setViewport({
//         latitude: filtered[0].lngLat[1],
//         longitude: filtered[0].lngLat[0],
//         zoom: 15,
//         transitionDuration: 1000,
//       });
//     }
//   };

//   return (
//     <input
//       type="text"
//       value={query}
//       onChange={handleSearch}
//       placeholder="Search markers..."
//       className="search-bar"
//     />
//   );
// };

// export default SearchBarComponent;
