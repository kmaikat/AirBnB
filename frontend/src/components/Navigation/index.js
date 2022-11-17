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
      <ul>
        <div className="logo">
          <i className="fa-solid fa-exclamation"></i>
          <li>
            <NavLink exact to="/"><i className="fa-solid fa-bed"></i></NavLink>
          </li>
        </div>

        <div>
          <Link to="/spot/create">Become a Host</Link>
          <li>
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
