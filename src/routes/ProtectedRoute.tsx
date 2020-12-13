import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../services/Auth/AuthProvider';

interface ProtectedRouteInterface {
  component: any;
  exact: any;
  path: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteInterface> = ({
  component: Component,
  ...rest
}) => {
  const authContext = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authContext.isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
