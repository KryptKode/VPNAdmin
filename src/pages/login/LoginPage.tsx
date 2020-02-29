import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import API from '../../utils/API';

import { LoginForm } from '../../components';
import { AxiosError } from 'axios';
import ServerErrorWrapper from '../../interfaces/ServerErrorWrapper';
import LoginResponse from '../../interfaces/LoginResponse';

import {
    setLoggedInLocally
} from '../../utils/authHandler';
import { HOME_ROUTE } from '..';

const LoginPage = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const location = useLocation();

    const { from }: any = location.state || { from: { pathname: HOME_ROUTE } };

    const login = (username: string, password: string) => {
        setErrorMessage('');
        setLoading(true);
        API().post('/users/login', { username: username, password: password, realm:'admin' })
            .then(res => {
                setLoading(false);
                const response = res.data as LoginResponse
                console.log("res: ", res)
                setLoggedInLocally(response);
                history.replace(from);
            }).catch((err: AxiosError) => {
                setLoading(false);
                if (err.response) {
                    const error = err.response.data as ServerErrorWrapper
                    console.error(error);
                    if (error.error.statusCode === 401) {
                        setErrorMessage("Login failed, check your credentials");
                    } else {
                        setErrorMessage(error.error.message);
                    }
                }else{
                    setErrorMessage("An error ocurred!");
                }
                console.error(err);
            });
    }

    return (
        <div className='login-container'>
            <div className='side-image' />
            <LoginForm login={login} errorMessage={errorMessage} loading={loading} />
        </div>
    );
};

export default LoginPage;
