import React, { useState, FormEvent } from 'react';
import logo from '../../res/logo.svg';
import { Loading } from '../loading';
import { DisplayError } from '../error';

interface LoginFormProps{
    login: (username:string, password:string)=> void,
    errorMessage?:string,
    loading?:boolean

}

const LoginForm = ({login, errorMessage, loading}: LoginFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState(false);
    const formErrorMessage = 'All fields are required';

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if(validate()){
            login(username, password);
        }
    }

    const validate = () => {
        const validPassword = password.length > 0;
        const validUsername = username.length > 0;
        const noError = (validPassword && validUsername)
        setFormError(!noError)
        return noError;
    }

    return (
        <div className='form-container'>
            <img src={logo} className='logo' alt='Xeen VPN Logo' />
            <h1 className='text-primary'>XEEN VPN</h1>
            <p className="text-secondary">Welcome back.<br />Please login to your account</p>
            {formError && <DisplayError message={formErrorMessage} />}
            {errorMessage && <DisplayError message={errorMessage} />}
            {loading && <Loading />}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        id="username"
                        placeholder='Username'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        placeholder='Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
            <p className='copyright'>CopyRight &copy;{new Date().getFullYear()}</p>
        </div>

    );
};

export default LoginForm;