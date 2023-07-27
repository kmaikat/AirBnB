import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage.js';
// import { SignupFormPage } from './components/SignupFormPage.js';
import Navigation from './components/Navigation/index.js';
import SpotsIndex from './components/Spots/SpotIndex'
import SpotShow from './components/Spots/SpotShow.js';
import CreateSpotForm from './components/Spots/CreateSpotForm.js'
import EditSpotForm from './components/Spots/EditSpotForm.js'
import CreateReviewForm from './components/Reviews/CreateReviewForm.js';
import EditReviewForm from './components/Reviews/EditReviewForm.js';
import * as sessionActions from './store/session'
import WishlistIndex from './components/Wishlist/WishlistIndex.js';
import WishlistShow from './components/Wishlist/WishlistShow.js';
import WishlistCard from './components/Wishlist/WishlistCard.js';
import TripsIndex from './components/Navigation/TripsIndex.js';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className='header'>
        <div id='header-navbar'>
          <Navigation isLoaded={isLoaded} id="header-navbar" />
        </div>
      </div>
      <main>
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <SpotsIndex />
            </Route>
            <Route path="/spots/:spotId">
              <SpotShow />
            </Route>
            <Route path="/spot/create">
              <CreateSpotForm />
            </Route>
            <Route path="/spot/:spotId/edit">
              <EditSpotForm />
            </Route>
            <Route path="/spot/:spotId/reviews/create">
              <CreateReviewForm />
            </Route>
            <Route path="/spot/:spotId/reviews/:reviewId/edit">
              <EditReviewForm />
            </Route>
            <Route path="/wishlists/:wishlistId">
              <WishlistShow/>
            </Route>
            <Route path="/wishlists">
              <WishlistIndex/>
            </Route>
            <Route path="/trips">
              <TripsIndex/>
            </Route>
          </Switch>
        )}
      </main>
    </>
  );
}

export default App;
