import React, { useState, useEffect } from 'react';

import {
    ServerForm,
    NavBarHomeAddServer,
    NavBarHomeEditServer,
    ConfirmDialog,
    Loading,
    DisplayError,
} from '../../components';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Server from '../../interfaces/Server';
import { doLogout, doAddNewServer, doUpdateServer, doDeleteServer } from '../../utils/API';
import { AxiosError, AxiosResponse } from 'axios';
import { LOGIN_ROUTE } from '../login';
import { logOutLocally } from '../../utils/authHandler';
import { HOME_ROUTE } from '..';
import { ServerState } from '../../store/servers/types';
import { connect, } from 'react-redux';
import { AppState } from '../../store';
import getAPI from '../../utils/API';
import { errorHandler } from '../../utils/errorHandler';

interface ServerInfoState {
    servers: ServerState
}

const mapStateToProps = (state: AppState) => {
    return {
        servers: state.servers
    }
}


const ServerInfoPage = ({ servers }: ServerInfoState) => {
    const defaultErrorMessage = ''
    const { id } = useParams();
    const defaultServer: Server = { config: "", password: "", serverCountry: "", serverIp: "", serverName: "", username: "" }
    const [loading, setLoading] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);
    const [server, setServer] = useState(defaultServer);
    const serversData = servers.servers


    const handleError = (error: AxiosError) => {
        const message = errorHandler(error);
        setErrorMessage(message);
        console.error(error)
        hideLoading();
    }

    const showLoading = () => {
        setLoading(true);
        resetErrorMessage()
    }

    useEffect(() => {
        if (id) {
            const cachedServer = serversData[id];
            if (cachedServer) {
                setServer(cachedServer)
            } else {
                setLoading(true);
                setErrorMessage(defaultErrorMessage);
                getAPI().get(`/Servers/${id}`)
                    .then((res: AxiosResponse) => {
                        setLoading(false)
                        const remoteServer = res.data as Server
                        setServer(remoteServer)
                    }).catch((err: AxiosError) => {
                        const message = errorHandler(err);
                        setErrorMessage(message);
                        setLoading(false);
                    })
            }
        }
    }, [id, serversData]);


    const history = useHistory();
    const location = useLocation();

    const { fromLogin }: any = location.state || { fromLogin: { pathname: LOGIN_ROUTE } };
    // const { fromHome }: any = location.state || { fromHome: { pathname: HOME_ROUTE } };


    const handleLogOut = () => {
        doLogout()
            .then((res: AxiosResponse) => {
                deleteLocalDataAndGoToLogin()
            })
            .catch((error: AxiosError) => {
                console.error(error);
                deleteLocalDataAndGoToLogin();
            })
    }

    const deleteLocalDataAndGoToLogin = () => {
        logOutLocally();
        history.replace(fromLogin);
    }

    const uploadServer = (server: Server, isNew: boolean) => {
        console.log("SERVER, isnew", server, isNew)
        showLoading();
        if (isNew) {
            doAddNewServer(server)
                .then((res: AxiosResponse) => {
                    handleResponse(res);
                }).catch((error: AxiosError) => {
                    handleError(error);
                });
        } else {
            doUpdateServer(server)
                .then((res: AxiosResponse) => {
                    handleResponse(res);
                }).catch((error: AxiosError) => {
                    handleError(error);
                });
        }
    }

    const resetErrorMessage = () => {
        setErrorMessage(defaultErrorMessage);
    }

    const handleResponse = (res: AxiosResponse) => {
        console.log(res);
        hideLoading();
        resetServer();
        history.push(HOME_ROUTE);
    }

    const hideLoading = () => {
        setLoading(false)
    }

    const deleteServer = (id: string) => {
        openDeleteConfimDialog()
    }

    const handleBackClick = () => {
        resetServer()
        history.goBack();
    }

    const openDeleteConfimDialog = () => {
        setShowDeleteDialog(true)
    }
    const closeDeleteConfimDialog = () => {
        setShowDeleteDialog(false)
    }

    const resetServer = () => {
        setServer(defaultServer);
    }

    const confirmDelete = () => {
        doDeleteServer(id)
            .then((res: AxiosResponse) => {
                handleResponse(res);
            }).catch((error: AxiosError) => {
                handleError(error);
            });
    }


    return (
        <div className="container">
            {id && <NavBarHomeEditServer onLogout={handleLogOut} serverName={server ? (server as Server).serverName : ""} handleBackClick={handleBackClick} />}
            {!id && <NavBarHomeAddServer handleLogout={handleLogOut} />}
            {loading && <Loading />}
            {(errorMessage.length > 0) && <DisplayError message={errorMessage ?? "An error occurred"} />}
            <div className="server-form-root">
                <ServerForm serverId={id} server={server} uploadServer={uploadServer} deleteServer={deleteServer} loading={loading} />
            </div>
            <ConfirmDialog
                onConfirm={confirmDelete}
                isOpen={showDeleteDialog}
                onRequestClose={closeDeleteConfimDialog}
            />
        </div>
    );
};

export default connect(mapStateToProps)(ServerInfoPage);