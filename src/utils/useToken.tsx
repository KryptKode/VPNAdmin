import { useState, useEffect } from 'react';

import {getLoginResponse} from './localStorage';

const useAuthentication = ()=>{
    const [token, setToken] = useState();
    useEffect(()=>{
        const loginResponse = getLoginResponse();
        setToken(loginResponse)
    },[token])
    return token
};

export default useAuthentication;