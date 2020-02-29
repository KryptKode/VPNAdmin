import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
    NavBarHome,
    ServerList,
    EmptyServer,
    Loading,
    DisplayError as ShowError,
} from '../../components';

// import serversData from '../../data/servers.json';
import { useHistory, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '..';
import API from '../../utils/API';
import { AxiosResponse, AxiosError } from 'axios';
import { logOutLocally } from '../../utils/authHandler';
import { ServerState } from '../../store/servers/types';
import { getServers } from '../../utils/downloadServer';
import { AppState } from '../../store';
import { DisplayError } from '../../store/showerror/types';


interface HomeState {
    getServers: any,
    servers: ServerState,
    isLoading: boolean,
    displayError: DisplayError
}


const mapStateToProps = (state: AppState) => {
    return {
        servers: state.servers,
        isLoading: state.loading.isLoading,
        displayError: state.showError.displayError,
    }
}


const HomePage = (props: HomeState) => {
    //TODO: Fetch list
    const { servers, getServers, isLoading, displayError } = props
    const [loading, setLoading] = useState(false);
    const serversData = Object.values(servers.servers ? servers.servers : []);
    
    useEffect(() => {
        getServers();
    }, [getServers])

    const history = useHistory();
    const location = useLocation();

    const { from }: any = location.state || { from: { pathname: LOGIN_ROUTE } };

    const showLoading = () => {
        setLoading(true);
    }

    const hideLoading = () => {
        setLoading(false)
    }

    const handleLogOut = () => {
        showLoading()
        API().post('/Users/logout')
            .then((res: AxiosResponse) => {
                hideLoading()
                deleteLocalDataAndGoToLogin()
            })
            .catch((error: AxiosError) => {
                hideLoading()
                console.error(error);
                deleteLocalDataAndGoToLogin();
            })
    }

    const deleteLocalDataAndGoToLogin = () => {
        logOutLocally();
        history.replace(from);
    }

    return (

        <div className='container'>
            <NavBarHome handleLogout={handleLogOut} />
            {(loading || isLoading) && <Loading />}
            {(displayError.show) && <ShowError message={displayError.message ?? "An error occurred"} />}
            <div className="server-root">
                {serversData && serversData.length > 0 && <ServerList items={serversData} />}
                {(!serversData || serversData.length <= 0) && <EmptyServer />}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, { getServers })(HomePage);