import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MapView from './components/MapView';
import WishList from './components/WishList';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/" component={MapView} />
        <Route path="/wishlist" component={WishList} />
      </Switch>
    </div>
  );
}

export default App;
