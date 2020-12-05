import { makeRequest, useFetchDispatch } from '../utils/request';
import urls from '../constants/urls';

const fetchDispatch = useFetchDispatch();

export const fetchBots = async () => {
  return makeRequest(urls.bots, 'GET')
    .then((response) => {
      // fetchDispatch({ type: 'FETCH_SUCCESS', payload: response.data })
    })
    .catch((error) => {
      // fetchDispatch(type: '/FETCH_ERROR')
    });
};
