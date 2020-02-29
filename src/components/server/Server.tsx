import React from 'react';
import ServerInterface from '../../interfaces/Server';
import { Link } from 'react-router-dom';

interface ServerProps {
    item: ServerInterface
}

const Server = ({ item }: ServerProps) => {
    return (
        <Link to={`/Server/${item.id}`}>
            <div className="server-item">
                <img src={`https://www.countryflags.io/${item.serverCountry}/shiny/64.png`} alt='Country flag' />
                <div className='server-item-text'>
                    <h3>{item.serverName}</h3>
                    <p>{item.serverIp}</p>
                </div>
            </div>
        </Link>

    );
};

export default Server;