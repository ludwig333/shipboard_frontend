import React, { useContext, createContext, useReducer, ReactNode } from 'react';
import { authReducer } from './reducer';
import { getItem } from '../../utils/storage';
import JWTValidator from './JWTValidator';

interface AuthProviderProps {
  children: ReactNode;
}
const initialState = {
  name: "Guest",
  isAuthenticated: !!(getItem("token") && JWTValidator(getItem("token"))) ,
};

type InitialStateType = typeof initialState;

const AuthStateContext = createContext<InitialStateType>(initialState);

const AuthDispatchContext = createContext<any>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
};

export const useLogout = () => {
  const authDispatch = useAuthDispatch();

  return () => {
    authDispatch({ type: 'LOGOUT', payload: null });
  };
};
