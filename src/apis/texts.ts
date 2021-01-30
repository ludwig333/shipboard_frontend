import { makeRequest } from '../utils/request';
import urls from '../constants/urls';
import { getItem } from '../utils/storage';


export const saveText = async (data) => {
  return makeRequest(urls.texts, 'POST', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}

export const updateText = async (data, id: string) => {
  return makeRequest(urls.texts + '/' + id, 'PUT', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}

export const deleteText = async (id: string) => {
  return makeRequest(urls.texts + '/' + id, 'DELETE', null, { Authorization: 'Bearer ' + getItem('token') });
}
