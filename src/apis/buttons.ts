import { makeRequest } from '../utils/request';
import urls from '../constants/urls';
import { getItem } from '../utils/storage';


export const saveButton = async (data) => {
  return makeRequest(urls.button, 'POST', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data)
}

export const updateButton = async (data, id: string) => {
  return makeRequest(urls.button + '/' + id, 'PUT', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}

export const deleteButton = async (id : string) => {
  return makeRequest(urls.button + '/' + id, 'DELETE', null, { Authorization: 'Bearer ' + getItem('token') });
}

export const createAndConnectWithButton = async (data, id: string) => {
  return makeRequest(urls.button + '/create-and-connect/' + id, 'POST', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}
export const connectButtonToFlow = async (data, id: string) => {
  return makeRequest(urls.message + '/connect-flow/' + id, 'POST', data, { Authorization: 'Bearer ' + getItem('token') });
}