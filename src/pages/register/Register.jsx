import React, { useRef } from 'react'
import "../register/register.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Password don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("/auth/register", user);
                navigate("/login");
            } catch (err) {

            }
        }
    };

    return (
        <div className="login">
            <div className='loginWrapper'>
                <div className="loginLeft">
                    <h3 className="loginLogo">Lakruwansocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Lakruwansocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder='Username'
                            type="text"
                            className="loginInput"
                            ref={username}
                            required
                        />
                        <input
                            placeholder='Email'
                            type="email"
                            className="loginInput"
                            ref={email}
                            required
                        />
                        <input
                            placeholder='Password'
                            type="Password"
                            className="loginInput"
                            ref={password}
                            required
                            minLength="4"
                        />
                        <input
                            placeholder='Password Again'
                            type="Password"
                            className="loginInput"
                            ref={passwordAgain}
                            required
                        />
                        <button className="loginButton" type='submit'>Sign up</button>
                        <button className="loginRegisterButton">Login to your account</button>
                    </form>
                </div>
            </div>
        </div>
    )
};
