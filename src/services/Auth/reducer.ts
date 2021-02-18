import { setItem, removeItem } from '../../utils/storage';

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      setItem('name', action.payload.name)
      setItem('token', action.payload.token);
      return { ...state, name: action.payload.fname, isAuthenticated: true };

    case 'LOGOUT':
      removeItem('token');
      removeItem('name');
      return { isAuthenticated: false };

    default:
      throw new Error('undefined action type');
  }
};
