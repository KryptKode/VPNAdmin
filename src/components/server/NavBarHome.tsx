import React from 'react';
import { Link } from 'react-router-dom';

import Top from './TopLine';
import logo from '../../res/logo.svg';
import logoutIcon from '../../res/logout.svg';
import { SERVER_ROUTE } from '../../pages';

interface NavBarHomeProps {
    handleLogout: () => void
}

const NavBarHome = ({ handleLogout }: NavBarHomeProps) => {

    return (
        <div>
            <Top />
            <nav className='nav-bar'>
                <div className="nav-items">
                    <img src={logo} alt='Xeen VPN logo' />
                    <p className='selected'>ServerList</p>
                    <Link to={SERVER_ROUTE}>
                        <p className='unselected'>AddServer</p>
                    </Link>
                </div>
                <div className="logout">
                    <p className="logout-btn" onClick={handleLogout}>Logout</p>
                    <img className="logout-icon" src={logoutIcon} alt="Logout icon"/>
                </div>
            </nav>
        </div>
    );
};

export default NavBarHome;