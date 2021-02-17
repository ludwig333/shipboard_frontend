import urls from '../constants/urls';
import { makeRequest } from '../utils/request';
import { CredentialData, RegistrationData } from '../../types';
import { getItem } from '../utils/storage';

export const login = async (credentials: CredentialData) => {
  return makeRequest(urls.login, 'POST', credentials)
    .then((response) => response.data);
};

export const register = async (data: RegistrationData) => {
  return makeRequest(urls.register, 'POST', data)
    .then((response) => response.data);
};

export const forgotPassword = async (email: string) => {
  return makeRequest(urls.forgotPassword, 'POST', { email })
    .then((response) => response.data);
};

export const resetPassword = async () => {
  return makeRequest(urls.resetPassword, 'POST')
    .then((response) => response.data);
};

export const getAuthUser = async () => {
  return makeRequest(urls.authUser, 'GET', null, { Authorization: 'Bearer ' + getItem('token') })
    .then((response) => response.data)
}

export const logOut = async () => {
  return makeRequest(urls.logOut, 'POST', null, { Authorization: 'Bearer ' + getItem('token') }
  ).then((response) => response.data)
}

export const getOverview = async () => {
  return makeRequest(urls.overview, 'GET', null, { Authorization: 'Bearer ' + getItem('token') }).then((response) => response.data);
}