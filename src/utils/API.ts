import axios from 'axios';

import {CONFIG} from '../config';

import {getLoginResponse} from './localStorage';

import * as AxiosLogger from 'axios-logger';
import Server from '../interfaces/Server';

const getAPI = ()=>{
  const API = axios.create({
    baseURL: CONFIG.serverUrl
  });

 const response = getLoginResponse(); 

 console.log("TOKEN", response);

 API.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
 API.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);

API.defaults.headers.common['Authorization'] = response.id;
return API;
}

export interface LoginBody{
  username: string,
   password: string, 
   realm:'admin',
}

export const doLogin = (loginBody:LoginBody)=>{
  return getAPI().post('/users/login', loginBody)
}

export const doGetServers = ()=> {
  return getAPI().get(`/Servers`);
}

export const doLogout = ()=> {
  return getAPI().post('/Users/logout')
}

export const doUpdateServer = (server:Server)=> {
  return  getAPI().patch(`/Servers`, server)
}

export const doAddNewServer = (server: Server)=> {
  return  getAPI().post('/Servers', server)
}

export const doDeleteServer = (serverId:string | undefined) =>{
  return getAPI().delete(`/Servers/${serverId}`)
}

export default getAPI;
