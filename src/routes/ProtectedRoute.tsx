import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../services/Auth/AuthProvider';
import AppLayout from '../components/layout/AppLayout';

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
          return (
            <AppLayout>
              <Component {...props} />
            </AppLayout>
          );
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
