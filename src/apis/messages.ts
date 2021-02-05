import { makeRequest } from '../utils/request';
import urls from '../constants/urls';
import { getItem } from '../utils/storage';


export const getMessages = async (flow) => {
  return makeRequest(urls.messages + '?flow=' + flow, 'GET', null, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}

export const saveMessage = async (data) => {
  return makeRequest(urls.messages, 'POST', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}

export const createAndConnectMessage = async (data, id: string) => {
  return makeRequest(urls.message + '/create-and-connect/' + id, 'POST', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}

export const updateMessage = async (data, id: string) => {
  console.log(data);
  return makeRequest(urls.messages + '/' + id, 'PUT', data, { Authorization: 'Bearer ' + getItem('token') });
}

export const deleteMessage = async (id: string) => {
  return makeRequest(urls.messages + '/' + id, 'DELETE', null, { Authorization: 'Bearer ' + getItem('token') });
}
