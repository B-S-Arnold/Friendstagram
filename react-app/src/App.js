import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/Profile';
import { authenticate } from './store/session';
import SplashPage from './components/Splash';
import Footer from './components/Footer';
import Settings from './components/Settings';
import Game from './components/XP/Game';


function App() {
  const user = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
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

      <Routes>
        <Route path='/' exact={'true'} element={<SplashPage user={user} />} />
        <Route path='/sign-up' exact={'true'} element={<SignUpForm />} />
        <Route path='/:username/' exact={'true'} element={
          <ProtectedRoute user={user}>
            <User />
          </ProtectedRoute>} />


        <Route path='/accounts/edit' exact={'true'} element={
          <ProtectedRoute user={user}>
            <Settings />
          </ProtectedRoute>} />

        <Route path='/game' exact={'true'} element={<Game />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
