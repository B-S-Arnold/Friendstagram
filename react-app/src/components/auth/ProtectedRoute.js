import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { readImages } from '../../store/images';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)

  return (
    <Route {...props}>
      {(user)? props.children  : <Redirect to='/' />}
    </Route>
  )
};


export default ProtectedRoute;
