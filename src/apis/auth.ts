import urls from '../constants/urls';
import { makeRequest } from '../utils/request';
import { CredentialData, RegistrationData } from '../../types';


export const login = async (credentials:CredentialData) => {
  return makeRequest(urls.login, "POST", credentials).then((response) => response.data);
}  
 
export const register = async (data:RegistrationData) => {
  return makeRequest(urls.register, "POST", data).then((response) => response.data);
}

export const forgotPassword = async () => {
  return makeRequest(urls.forgotPassword, "POST").then((response) => response.data)
}
 
export const resetPassword = async () => {
  return makeRequest(urls.resetPassword, "POST").then((response) => response.data)
}