import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Map</Link></li>
        <li><Link to="/wishlist">Wish List</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
