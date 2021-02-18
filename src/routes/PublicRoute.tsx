import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../services/Auth/AuthProvider';


export const PublicRoute = ({ ...props }) => {

  const authContext = useAuthContext();


  const isAllowed = authContext.isAuthenticated;
  return isAllowed
      ? (<Redirect to="/app" />)
      : (<Route {...props} />)
};