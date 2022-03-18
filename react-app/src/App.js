import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/Splash';

function App() {
  const user = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {user && <NavBar user={user} />}
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage user={user}/>
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/:username' exact={true} >
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
