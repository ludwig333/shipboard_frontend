import { useReducer, createContext, useContext } from 'react';
import axios, { Method } from 'axios';
import { ReducerType } from '../../types';

export const makeRequest = async (
  url: string,
  method: Method,
  data?: any,
  headers?: any
) => {
  const response = await axios({
    url,
    method,
    data,
    headers,
  });
  return response;
};

axios.interceptors.request.use(async function (config: any) {
  const token = 'dummytoken';

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };

  return config;
});


const initialState = {
  data: {},
  error: '',
  isLoading: true
};

const reducer = (state: object, action: {type:string, payload: string}) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        data: action.payload,
        error: '',
        isLoading: false,
      };
    case 'FETCH_ERROR':
      return {
        data: {},
        error: 'Something went wrong',
        isLoading: false,
      };

    default:
      return state;
  }
};

const FetchDispatchContext = createContext({});

export const useFetchDispatch = () => {
  const context = useContext(FetchDispatchContext);
  if (context === undefined) {
    throw new Error("useFetchDispatch must be used within a FetchProvider")
  }

  return context;
}