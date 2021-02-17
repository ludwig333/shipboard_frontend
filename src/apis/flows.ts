import { makeRequest } from '../utils/request';
import urls from '../constants/urls';
import { getItem } from '../utils/storage';
import { FlowDataType } from '../../types';


export const getFlows = async (bot, pageNumber = 1) => {
  return makeRequest(urls.flows + '?bot=' + bot + '&page=' + pageNumber, 'GET', null, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data)
}

export const getFlow = async (flow) => {
  return makeRequest(urls.flows + '/' + flow , 'GET', null, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data)
}

export const saveFlow = async (data: FlowDataType) => {
  return makeRequest(urls.flows, 'POST', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data)
}

export const updateFlow = async (data: {name: string}, id: string) => {
  return makeRequest(urls.flows + '/' + id, 'PUT', data, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}

export const deleteFlow = async (id: string) => {
  return makeRequest(urls.flows + '/' + id, 'DELETE', null, { Authorization: 'Bearer ' + getItem('token') });
}

export const publishFlow = async (id: string) => {
    return makeRequest(urls.flow + '/publish/' + id, 'POST', null, { Authorization: 'Bearer ' + getItem('token') });
}

export const installBookingTemplate = async (id: string) => {
  return makeRequest(urls.flow + '/install/booking-template/' + id, 'POST', null, { Authorization: 'Bearer ' + getItem('token') });
}
