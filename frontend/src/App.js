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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className='header'>
        <div className='app-container'>
          <Navigation isLoaded={isLoaded} />
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
          </Switch>
        )}
      </main>
      <div className="footer">
        <div className='app-container'>
          <h1>come back and do this l8tr, this is my foot</h1>
        </div>
      </div>
    </>
  );
}

export default App;
