import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import "./Navigation.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function ProfileButton({ user, setShowModal, setLogin }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div id="floating-menu">
            <button className="menu" onClick={openMenu}>
                <i className="fa-solid fa-bars"></i>
                <i className="fa-solid fa-circle-user"></i>

            </button>
            {showMenu && (user ? (
                <ul className="profile-dropdown">
                    <div id="profile-dropdown-user-info">
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                    </div>
                    <Link to="/trips">Trips</Link>
                    <Link to="/wishlists">Wishlists</Link>
                    <li onClick={logout}>
                        Log Out
                    </li>
                </ul>
            ) :
                (<ul className="profile-dropdown">
                    <li onClick={() => {
                        setShowModal(true);
                        setLogin(true);
                    }}>
                        Log in
                    </li>
                    <li onClick={() => {
                        setShowModal(true);
                        setLogin(false);
                    }}>
                        Sign Up
                    </li>
                </ul>))
            }
        </div>
    );
}
