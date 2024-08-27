import React from 'react';
import axios from 'axios';

function PlacesList({ places, onAddToWishlist }) {
  const addToWishlist = (place) => {
    const newItem = {
      name: place.tags.name || 'Unknown Place',
      location: `${place.lat}, ${place.lon}`,
      latitude: place.lat,
      longitude: place.lon,
    };
    axios.post('http://localhost:8000/wishlist/', newItem)
      .then(() => onAddToWishlist())
      .catch(error => console.error('Error adding to wishlist:', error));
  };

  return (
    <div>
      <h2>Nearby Places</h2>
      <ul>
        {places.map((place, index) => (
          <li key={index}>
            {place.tags.name || 'Unknown Place'}
            <button onClick={() => addToWishlist(place)}>Add to Wishlist</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlacesList;
