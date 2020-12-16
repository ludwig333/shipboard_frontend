import Cookies from 'js-cookie';

export const setItem: (key: string, value: string) => void = (key, value) => {
  Cookies.set(key, value);
};

export const getItem: (key: string) => string|undefined = (key) => {
  return Cookies.get(key);
};

export const removeItem: (key: string) => void = (key) => {
  Cookies.remove(key);
};
