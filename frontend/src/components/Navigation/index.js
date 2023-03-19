import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import { SignupFormPage } from '../SignupFormPage.js';
import { useState } from 'react'


export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const user = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       {/* <NavLink to="/login">Log In</NavLink> */}
  //       <LoginFormModal/>
  //       <NavLink to="/signup">Sign Up</NavLink>
  //     </>
  //   );
  // }

  return (
    <div className='navBar'>
      <ul id="navigation-header-main">
        <div id="navigation-logo">
          <NavLink exact to="/" className="logo">
            <i className="fa-solid fa-exclamation"></i>
            <i className="fa-solid fa-bed"></i>
            <p id="navigation-notairbnb">notairbnb</p>
          </NavLink>
        </div>

        <div className='top-right'>
          {user &&
            <div>
              <Link id="become-a-host-button" to="/spot/create">Become a Host</Link>
              <Link  to="/wishlists" ><i id="become-a-host-button" className="fa-regular fa-heart"></i></Link>
            </div>
          }
          <li id="profile-button">
            {isLoaded && (
              <ProfileButton
                user={sessionUser}
                setLogin={setLogin}
                setShowModal={setShowModal} />
            )}
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                {login ? (
                  <LoginForm setShowModal={setShowModal} />
                ) : (
                  <SignupFormPage setShowModal={setShowModal} />
                )}
              </Modal>
            )}
          </li>

        </div>


      </ul>
    </div>
  );
}
