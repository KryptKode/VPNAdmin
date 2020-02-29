import axios from 'axios';

import {CONFIG} from '../config';

import {getLoginResponse} from './localStorage';

import * as AxiosLogger from 'axios-logger';

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

export default getAPI;
