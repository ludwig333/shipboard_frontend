import { makeRequest } from '../utils/request';
import urls from '../constants/urls';
import { getItem } from '../utils/storage';


export const addCardGroup = async (data) => {
  return makeRequest(urls.cardGroups, 'POST', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}

export const deleteCardGroup = async (id: string) => {
  return makeRequest(urls.cardGroups + '/' + id, 'DELETE', null, { Authorization: 'Bearer ' + getItem('token') });
}

export const addCard = async (cardGroupId: string) => {
  return makeRequest(urls.card + '/' + cardGroupId, 'POST', null, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}

export const updateCard = async (data, id) => {
  return makeRequest(urls.card + '/' + id, 'PUT', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}

export const uploadImage = async (data, id: string) => {
  const header = {
    'Authorization' : 'Bearer ' + getItem('token'),
    'Content-Type': 'multipart/form-data'
  }
  return makeRequest(urls.card + '/upload-image/' + id, 'POST', data, header).then((response) => response.data);
}

export const deleteCard = async (id: string) => {
  return makeRequest(urls.card + '/' + id, 'DELETE', null, { Authorization: 'Bearer ' + getItem('token') });
}
