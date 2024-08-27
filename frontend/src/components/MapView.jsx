import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import PlacesList from './PlacesList';
import WishList from './WishList';

// デフォルトアイコンの設定
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapView() {
  const [places, setPlaces] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showPins, setShowPins] = useState(true);

  const fetchPlaces = useCallback(async (lat, lng) => {
    try {
      const response = await axios.get(`http://localhost:8000/search_places/?lat=${lat}&lon=${lng}`);
      setPlaces(response.data.elements);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }, []);

  const fetchWishlistItems = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/wishlist/');
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  }, []);

  React.useEffect(() => {
    fetchWishlistItems();
  }, [fetchWishlistItems]);

  function MapEvents() {
    useMapEvents({
      dblclick(e) {
        const { lat, lng } = e.latlng;
        fetchPlaces(lat, lng);
      },
      contextmenu(e) {
        const { lat, lng } = e.latlng;
        const newItem = {
          name: 'Custom Location',
          location: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
          latitude: lat,
          longitude: lng,
        };
        axios.post('http://localhost:8000/wishlist/', newItem)
          .then(() => fetchWishlistItems())
          .catch(error => console.error('Error adding custom location:', error));
      },
    });
    return null;
  }

  return (
    <div style={{ display: 'flex' }}>
      <MapContainer 
        center={[35.6895, 139.6917]} 
        zoom={13} 
        style={{ height: "100vh", width: "70%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        {showPins && wishlistItems.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.name}</Popup>
          </Marker>
        ))}
        {showPins && places.map((place) => (
          <Marker 
            key={place.id} 
            position={[place.lat, place.lon]}
          >
            <Popup>
              <h3>{place.tags.name || 'Unnamed Place'}</h3>
              <p>{place.tags.tourism || 'Tourist Attraction'}</p>
              {place.tags.description && <p>{place.tags.description}</p>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div style={{ width: "30%", height: "100vh", overflowY: "auto" }}>
        <button onClick={() => setShowPins(!showPins)}>
          {showPins ? 'Hide Pins' : 'Show Pins'}
        </button>
        <PlacesList places={places} onAddToWishlist={fetchWishlistItems} />
        <WishList items={wishlistItems} onUpdate={fetchWishlistItems} />
      </div>
    </div>
  );
}

export default MapView;
