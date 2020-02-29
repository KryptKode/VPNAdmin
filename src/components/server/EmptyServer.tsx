import React from 'react';
import { Link } from 'react-router-dom';

import { SERVER_ROUTE } from '../../pages';
import Server from '../../res/server.svg';


const EmptyServer = () => {
    return (
        <div className="empty-server">
            <img src={Server} alt="Server Icon" />
            <p>No servers yet</p>
            <Link to={SERVER_ROUTE}>
                <p className="btn">Add a server</p>
            </Link>
        </div>
    )
};

export default EmptyServer;