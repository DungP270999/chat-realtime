import React from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {faCalendarAlt} from '@fortawesome/free-regular-svg-icons';
import {useSelector} from "react-redux";
import Profile from "./Profile";

const NavBarItem = React.memo(() => {
    const {user} = useSelector(state => ({user: state.user}));
    const navItem = [
        {
            title: 'Chat',
            link: '/chat',
            icon: faShoppingCart,
        },
        {
            title: 'Danh sách online',
            link: '/online-list',
            icon: faCalendarAlt
        },
    ];

    return (
        <div className="d-flex justify-content-center mt-3 ml-1">
            {
                navItem.map(({link, title, icon}, index) => (
                    <NavLink
                        key={index}
                        to={link}
                        className="row align-items-center navbar-item"
                        activeClassName="active-navbar-item"
                    >
                        {
                            icon &&
                            <FontAwesomeIcon
                                icon={icon}
                                size="lg"
                                className="nav-item_icon mr-2"
                            />
                        }
                        <div className="text-black">
                            {title}
                        </div>
                    </NavLink>
                ))
            }
        </div>
    );
});

const Navbar = React.memo(() => {
    const {user} = useSelector(state => ({user: state.user}));
    return (
        <div className="navbar">
            <NavBarItem/>
            <div className="d-flex align-items-center">
                <Profile/>
            </div>
        </div>
    );
});

export default Navbar;
