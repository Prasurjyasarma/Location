import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useEffect, useRef } from 'react';
import Map from 'react-map-gl';
import MarkerComponent from './MarkerComponent';
import ModalComponent from './ModalComponent';
import DropdownFilter from './DropdownFilter';
import LogoComponent from './LogoComponent'; // Correctly import the LogoComponent
import FeedbackButtonComponent from './FeedbackButtonComponent'; 
import InfoButtonComponent from './InfoButtonComponent'; 
import AddPointButtonComponent from './AddPointButtonComponent';
import AddPointModalComponent from './AddPointModalComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
// import SearchBarComponent from './SearchBarComponent';
import OpeningModalComponent from './OpeningModalComponent';
import axios from 'axios';

const mapboxToken = 'pk.eyJ1IjoibGRkaXViYyIsImEiOiJjbHRuZ2pqY2EwM3pzMmt0MDRhMXN1dTJ4In0.qKU3pGvMBVG-zNboSHZr3A'; // Replace with your Mapbox token

const initialMarkers = [
    {
      name: 'Newton Apple Tree',
      image: 'Media/APPLE-TREE.png',
      description: 'A descendant of Isaac Newton’s famous apple tree, this tree near the TRIUMF facility symbolizes scientific inquiry and connects UBC to a significant moment in the history of science.',
      lngLat: [-123.23191611752542, 49.24731298375467],
      category: 'non-indigenous',
      content: [
        { type: 'image', src: 'Media/APPLE-TREE.png' },
        { type: 'image', src: 'Media/applegraphic.jpg' },
        
      ],
    },
    {
      name: 'Biodiversity Museum Archival Drawings',
      image: 'Media/BIODIVERSITY-2.png',
      category: 'non-indigenous',
      description: 'Home to over 2 million specimens, including a blue whale skeleton, this museum highlights UBC’s dedication to biodiversity research, conservation, and public education through exhibits and outreach.',
      lngLat: [-123.25088392612274, 49.263215379547944],
      content: [
        { type: 'image', src: 'Media/BIODIVERSITY-2.png'},
        { type: 'image', src: 'Media/Biodev1.jpg' },
        { type: 'image', src: 'Media/Biodev2.jpg' }, 
        { type: 'image', src: 'Media/Biodev3.jpg' }, 
        { type: 'image', src: 'Media/Biodev4.jpg' }, 
        { type: 'image', src: 'Media/Biodev5.jpg' },  
        { type: 'image-upload' }
      ],
    },
    {
      name: 'Reconciliation Pole',
      image: 'Media/RECONCILIATION-POLE.png',
      category: 'indigenous',
      description: 'This pole, carved by Haida artist James Hart, honors the resilience of Indigenous communities and the journey towards reconciliation, commemorating the legacy of residential schools in Canada.',
      lngLat: [-123.24888317177272, 49.26002576679409],
      content: [
       { type: 'image', src: 'Media/RECONCILIATION-POLE.png' },  
       { type: 'embed', src: 'https://online.fliphtml5.com/glfwv/iuzx/' }
       ]
      
    },
    {
      name: 'Aquatic Centre Infographics',
      image: 'Media/AQUATIC-CENTRE.png',
      category: 'non-indigenous',
      description: 'A LEED Gold certified facility, the UBC Aquatic Centre features a 50-meter competition pool, a 25-meter recreational pool, and a leisure pool, embodying UBC’s commitment to sustainability and community wellness.',
      lngLat: [-123.24867490370661, 49.26754424987624],
      content: [
        { type: 'image', src: 'Media/AQUATIC-CENTRE.png' },
        { type: 'image', src: 'Media/AquaticImage1.jpg' },
        { type: 'image', src: 'Media/AquaticImage2.jpg' },
        { type: 'image', src: 'Media/AquaticImage3.jpg' }
        
      ],
    },
    {
      name: 'Musqueam Pole',
      image: 'Media/MUSQUEAM-POLE.png',
      category: 'indigenous',
      description: 'This post acknowledges UBC’s location on the traditional, ancestral, and unceded territory of the Musqueam people, symbolizing the university"s respect for Indigenous culture and ongoing relationships.',
      lngLat: [-123.25089560080383, 49.26544495585327],
      content: [
        { type: 'image', src: 'Media/MUSQUEAM-POLE.png' },
        {
          "type": "youtube",
          "videoId": "uJYHpRRkhDY" 
        }
        
      ],
    },
    {
      name: 'Seed Lending Library - Collab Project',
      image: 'Media/SEED-LIB.png',
      category: 'non-indigenous',
      description: 'Located at UBC Farm, this initiative promotes sustainable agriculture by allowing the community to borrow and contribute seeds, supporting food security and biodiversity.',
      lngLat: [-123.25065787997795, 49.253244027006986],
      content: [
        { type: 'image', src: 'Media/SEED-LIB.png' },
        { type: 'image-upload' }
      ],
    },
    {
      name: 'The Shadow',
      image: 'Media/SHADOW.png',
      category: 'non-indigenous',
      description: 'An in-ground art installation resembling the shadow of a first-growth Douglas fir, The Shadow connects people, memory, and place, reflecting UBC’s relationship with the land and its history.',
      lngLat: [-123.25031181692984, 49.26619444584799],
      content: [
        { type: 'image', src: 'Media/SHADOW.png' },
       
        { type: 'embed', src: 'https://h5pstudio.opened.ca/wp-admin/admin-ajax.php?action=h5p_embed&id=528' },
        { type: 'embed', src: 'https://h5pstudio.opened.ca/wp-admin/admin-ajax.php?action=h5p_embed&id=524' }
         
      ],
    },
    {
      name: 'Tuning Fork',
      image: 'Media/TUNING-FORK.png',
      category: 'non-indigenous',
      description: 'This 7-meter-tall sculpture by Gerhard Class, made from Cor-Ten steel, symbolizes harmony and balance, reflecting UBC’s musical and collaborative spirit.',
      lngLat: [-123.25648650873724, 49.26714554791451],
      content: [
        { type: 'image', src: 'Media/TUNING-FORK.png' },
        {
          "type": "youtube",
          "videoId": "qgzdYESiCvk" 
        }
      
        
      ],
    },
    {
      name: 'Asian Centre',
      image: '/Media/ASIAN-CENTRE.png',
      category: 'non-indigenous',
      lngLat: [-123.2587553410869, 49.26680291332326],
      description: 'Inspired by Japanese architecture, the Asian Centre is a hub for cultural and academic activities, fostering intercultural dialogue and understanding of Asian cultures.',
      content: [
        { type: 'image', src: 'Media/ASIAN-CENTRE.png' },
        { type: 'embed', src: 'https://h5p.open.ubc.ca/wp-admin/admin-ajax.php?action=h5p_embed&id=3345' }
      ],
    },
    {
      name: 'C-Shore',
      image: '/Media/C-SHORE-ICON.png',
      category: 'non-indigenous',
      lngLat: [ -123.25212468238071, 49.2650965024548],
      description: 'A collaborative research ',
      content: [
        { type: 'image', src: '/Media/C-SHORE-ICON.png' },
        { type: 'embed', src: 'https://p3d.in/e/7aT3H' },
        {type: 'image', src: '/Media/cshoreimage.jpg'}
      ],
    }
  ];

  const MapComponent = () => {
    const [viewport, setViewport] = useState({
      latitude: 49.26002576679409,
      longitude: -123.24888317177272,
      zoom: 17,
      width: '100vw',
      height: '100vh',
      pitch: 70,
      bearing: -20
    });
  
    const [markers, setMarkers] = useState(initialMarkers);
    const [filteredMarkers, setFilteredMarkers] = useState(initialMarkers);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isAddingPoint, setIsAddingPoint] = useState(false);
    const [newPointLocation, setNewPointLocation] = useState(null);
    const [isOpeningModalOpen, setIsOpeningModalOpen] = useState(true);
    const [markerComments, setMarkerComments] = useState({}); // State for comments
  
    const mapRef = useRef();

    const getAddressFromCoordinates = async (longitude, latitude) => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`
        );
        const features = response.data.features;
        if (features.length > 0) {
          return features[0].place_name; // This will return the formatted address
        } else {
          return 'Address not found';
        }
      } catch (error) {
        console.error('Error getting address:', error);
        return 'Error getting address';
      }
    };
    
    useEffect(() => {
      const fetchAddresses = async () => {
        const updatedMarkers = await Promise.all(
          initialMarkers.map(async (marker) => {
            const address = await getAddressFromCoordinates(marker.lngLat[0], marker.lngLat[1]);
            return { ...marker, address }; // Add the address to the marker object
          })
        );
        setMarkers(updatedMarkers);
        setFilteredMarkers(updatedMarkers);
      };
    
      fetchAddresses();
    }, []);
    
  
    useEffect(() => {
      const handleResize = () => {
        setViewport(prevState => ({
          ...prevState,
          width: window.innerWidth,
          height: window.innerHeight,
        }));
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const handleAddPoint = async ({ latitude, longitude, name, description, image }) => {
      if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
        const address = await getAddressFromCoordinates(longitude, latitude);
        
        const newMarker = {
          name,
          image: 'Media/UBCPointQuestLogo.png', // Use the project logo for the marker
          description,
          address, // Add the fetched address to the marker
          lngLat: [longitude, latitude],
          category: 'user-added',
          content: [
            { type: 'image', src: image }, // Store the uploaded image in the content for the modal
            { type: 'text', text: description },
          ],
        };
        setMarkers([...markers, newMarker]);
        setFilteredMarkers([...markers, newMarker]);
        setIsAddingPoint(false);
        setNewPointLocation(null);
        console.log("New marker added:", newMarker);
      } else {
        console.error("Invalid coordinates received:", { latitude, longitude });
      }
    };
    
    const handleMapClick = (event) => {
      if (isAddingPoint) {
        const lngLat = event.lngLat;
  
        if (lngLat && typeof lngLat.lng === 'number' && typeof lngLat.lat === 'number') {
          const { lng: longitude, lat: latitude } = lngLat;
  
          setNewPointLocation({
            longitude,
            latitude,
          });
          console.log("New location set:", { longitude, latitude });
        } else {
          console.error("Invalid coordinates selected:", lngLat);
        }
      }
    };
  
    useEffect(() => {
      if (mapRef.current) {
        window.map = mapRef.current.getMap();
      }
    }, []);
  
    useEffect(() => {
      if (selectedCategory === 'all') {
        setFilteredMarkers(markers);
      } else {
        setFilteredMarkers(markers.filter(marker => marker.category === selectedCategory));
      }
    }, [selectedCategory, markers]);
  
    const handleCloseOpeningModal = () => {
      setIsOpeningModalOpen(false);
    };
  
    return (
      <>
        {isOpeningModalOpen && <OpeningModalComponent onClose={handleCloseOpeningModal} />}
        
        <LogoComponent />
        <DropdownFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <InfoButtonComponent />
        <FeedbackButtonComponent />
        <AddPointButtonComponent
          isAddingPoint={isAddingPoint}
          setIsAddingPoint={setIsAddingPoint}
        />
        <Map
          ref={mapRef}
          {...viewport}
          onMove={(evt) => setViewport(evt.viewState)}
          style={{ width: '100vw', height: '100vh' }}
          mapStyle="mapbox://styles/lddiubc/clu7kwh2302es01ptds9faj1l"
          mapboxAccessToken={mapboxToken}
          onClick={handleMapClick}
          onError={(e) => console.error('Error loading map:', e)}
        >
          {filteredMarkers.map((marker) => {
            const [longitude, latitude] = marker.lngLat || [];
            if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
              return (
                <MarkerComponent
                  key={marker.name}
                  marker={marker}
                  setSelectedMarker={setSelectedMarker}
                />
              );
            } else {
              console.error("Skipping marker with invalid coordinates:", marker);
              return null;
            }
          })}
        </Map>
        {selectedMarker && (
          <ModalComponent
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            markerComments={markerComments}
            setMarkerComments={setMarkerComments} 
          />
        )}
        {isAddingPoint && newPointLocation && (
          <AddPointModalComponent
            onClose={() => {
              setIsAddingPoint(false);
              setNewPointLocation(null);
            }}
            onAddPoint={handleAddPoint}
            selectedLocation={newPointLocation}
          />
        )}
      </>
    );
  };
  
  export default MapComponent;