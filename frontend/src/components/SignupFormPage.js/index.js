import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SignupForm.css'




export function SignupFormPage({ setShowModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([])

    if (sessionUser) return <Redirect to="/" />;

    function validator() {
        const errors = []
        console.log(username.length)
        if (!firstName) errors.push("Please provide your first name")
        if (firstName.length > 256) errors.push("First name cannot be longer than 256 characters")
        if (!lastName) errors.push("Please provide your last name")
        if (lastName.length > 256) errors.push("Last name cannot be longer than 256 characters")
        if (!email) errors.push("Please provide an email")
        if (email.length < 3) errors.push("Email cannot be less than 3 characters")
        if (email.length > 256) errors.push("Email cannot be longer than 256 characters")
        if (!username) errors.push("Please provide a valid username")
        if (username.length < 4) errors.push("Username cannot be less than 4 characters")
        if (username.length > 30) errors.push("Username cannot be more than 30 characters")
        if (password.length < 8) errors.push("Password must be more than 8 characters");
        if (password.length > 60) errors.push("Password must be less than 60 characters long");
        if (confirmPassword !== password) errors.push("Passwords do not match.");

        setErrors(errors)
        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validator(firstName, lastName, email, username, password, confirmPassword)
        if (errors.length > 0) {
            return setErrors(errors)
        }
         if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
                .then(() => {
                    setShowModal(false)
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });
        }
        // return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className='loginsignup-form'>
            <div className="signuplogin-form-header">
                <div className="signuplogin-form-x" onClick={() => setShowModal(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className="signuplogin-form-title">
                    <h2>Log in or sign up</h2>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="form">
                <ul className="errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="form-first-input"
                    required
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-mid-input"
                    placeholder="Last Name"
                    required
                />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="form-mid-input"
                    required
                />
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="form-mid-input"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className='form-mid-input'
                    required
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className='form-last-input'
                    required
                />

                <button type="submit" className="submit">Sign Up</button>
            </form>
        </div>
    );
}
