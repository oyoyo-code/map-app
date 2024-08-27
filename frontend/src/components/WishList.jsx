import React from 'react';
import axios from 'axios';

function WishList({ items, onUpdate }) {
  const deleteItem = (id) => {
    axios.delete(`http://localhost:8000/wishlist/${id}`)
      .then(() => onUpdate())
      .catch(error => console.error('Error deleting item:', error));
  };

  const openWebSearch = (name) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(name)}`, '_blank');
  };

  return (
    <div>
      <h2>Wish List</h2>
      {items && items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => openWebSearch(item.name)}>Search</button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the wish list.</p>
      )}
    </div>
  );
}

export default WishList;
