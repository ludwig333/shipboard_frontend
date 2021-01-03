import { makeRequest } from '../utils/request';
import urls from '../constants/urls';
import { getItem } from '../utils/storage';
import { BotDataType } from '../../types';


export const getBots = async (pageNumber = 1) => {
  return makeRequest(urls.bots + '?page=' + pageNumber, 'GET', null, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data)
}

export const saveBots = async (data: BotDataType) => {
  return makeRequest(urls.bots, 'POST', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data)
}

export const updateBot = async (data: BotDataType, id: string) => {
  return makeRequest(urls.bots + '/' + id, 'PATCH', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}

export const deleteBot = async (id : string) => {
  return makeRequest(urls.bots + '/' + id, 'DELETE', null, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}
