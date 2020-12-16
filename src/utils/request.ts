import axios, { Method } from 'axios';
import { getItem } from './storage';

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
  const token = getItem("token");

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };

  return config;
});
