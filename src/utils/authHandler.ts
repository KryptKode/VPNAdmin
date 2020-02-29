import {setLoggedIn, setLoginResponse, clearLoginResponse} from './localStorage';
import LoginResponse from '../interfaces/LoginResponse';

export const setLoggedInLocally = (response:LoginResponse)=>{
    setLoggedIn(true);
    setLoginResponse(response);
}

export const logOutLocally = ()=>{
    setLoggedIn(false);
    clearLoginResponse();
}