import { makeRequest } from '../utils/request';
import urls from '../constants/urls';
import { getItem } from '../utils/storage';
import { BotDataType } from '../../types';


export const getBots = async () => {
  return makeRequest(urls.bots, 'GET', null, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data)
}

export const saveBots = async (data: BotDataType) => {
  return makeRequest(urls.bots, 'POST', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data)
}
