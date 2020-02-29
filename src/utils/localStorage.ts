import LoginResponse from "../interfaces/LoginResponse";

export const LOGGED_IN_KEY = "xeen:loggedIn";
export const TOKEN = "xeen:token";

interface LoggedIn {
    loggedIn: boolean,
}

const DEFAULT_LOGIN_RESPONSE = {
    id:'',
    userId:'',
    ttl:'',
    created: '',
}

const LOGGED_IN_DEFAULT = {
    loggedIn: false
}

const setLoggedIn = (loggedIn: boolean) => {
    localStorage.setItem(LOGGED_IN_KEY, JSON.stringify({ loggedIn }));
}

const getLoggedIn = (): LoggedIn => {
    return JSON.parse(localStorage.getItem(LOGGED_IN_KEY) ?? JSON.stringify(LOGGED_IN_DEFAULT));
}

const setLoginResponse = (token: LoginResponse) => {
    localStorage.setItem(TOKEN, JSON.stringify(token));
}

const clearLoginResponse = ()=>{
    localStorage.setItem(TOKEN, JSON.stringify(DEFAULT_LOGIN_RESPONSE));
}

const getLoginResponse = (): LoginResponse => {
    return JSON.parse(localStorage.getItem(TOKEN) ?? JSON.stringify(DEFAULT_LOGIN_RESPONSE));
}



export { setLoggedIn, getLoggedIn, setLoginResponse, getLoginResponse, clearLoginResponse};