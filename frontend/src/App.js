import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage.js';
import { SignupFormPage } from './components/SignupFormPage.js';
import Navigation from './components/Navigation/index.js';
import SpotsIndex from './components/Spots/SpotIndex'
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
        <Navigation isLoaded={isLoaded} />
      </div>
      <main>
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <SpotsIndex />
            </Route>
          </Switch>
        )}
        <div>
          i am here
        </div>
      </main>

      <div className="footer">
        <h1>come back and do this l8tr</h1>
      </div>
    </>
  );
}

export default App;
