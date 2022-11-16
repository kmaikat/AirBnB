import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

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
        <>
            <button className="menu" onClick={openMenu}>
                <i className="fa-solid fa-bars"></i>
                <i className="fa-solid fa-circle-user"></i>

            </button>
            {showMenu && (user ? (
                <ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
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
        </>
    );
}
