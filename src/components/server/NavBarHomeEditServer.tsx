import React from 'react';

import Top from './TopLine';
import back from '../../res/back.svg';
import logoutIcon from '../../res/logout.svg';

interface NavBarProps {
    serverName:string,
    onLogout: () => void,
    handleBackClick: () => void,
}

const NavBarEditServer = ({onLogout, serverName, handleBackClick}: NavBarProps) => {

    return (
        <div>
            <Top />
            <nav className='nav-bar'>
                <div className="nav-back" onClick={handleBackClick}>
                    <img src={back} alt='Xeen VPN logo' />
                    <p>{`Server Details > ${serverName}`} </p>
                </div>
                <div className="logout">
                    <p className="logout-btn" onClick={onLogout}>Logout</p>
                    <img className="logout-icon" src={logoutIcon} alt="Logout icon"/>
                </div>
            </nav>
        </div>
    );
};

export default NavBarEditServer;