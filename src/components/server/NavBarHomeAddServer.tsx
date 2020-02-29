import React from 'react';
import { Link, } from 'react-router-dom';

import Top from './TopLine';
import logo from '../../res/logo.svg'
import logoutIcon from '../../res/logout.svg';
import { HOME_ROUTE, } from '../../pages';

interface NavBarProps {
    handleLogout: () => void
}

const NavBar = ({ handleLogout }: NavBarProps) => {

    return (
        <div>
            <Top />
            <nav className='nav-bar'>
                <div className="nav-items">
                    <img src={logo} alt='Xeen VPN logo' />
                    <Link to={HOME_ROUTE}>
                        <p className='unselected'>ServerList</p>
                    </Link>

                    <p className='selected'>AddServer</p>
                </div>

                <div className="logout">
                    <p className="logout-btn" onClick={handleLogout}>Logout</p>
                    <img className="logout-icon" src={logoutIcon} alt="Logout icon"/>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;