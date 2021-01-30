import { makeRequest } from '../utils/request';
import urls from '../constants/urls';
import { getItem } from '../utils/storage';


export const saveImage = async (data) => {
  return makeRequest(urls.images, 'POST', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}

export const uploadImage = async (data, id: string) => {
  const header = {
    'Authorization' : 'Bearer ' + getItem('token'),
    'Content-Type': 'multipart/form-data'
  }
  return makeRequest(urls.image + '/upload-image/' + id, 'POST', data, header).then((response) => response.data);
}

export const deleteImage = async (id: string) => {
  return makeRequest(urls.images + '/' + id, 'DELETE', null, { Authorization: 'Bearer ' + getItem('token') });
}
