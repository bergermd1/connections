import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button.jsx';
import './Home.css'

function Home() {
    const navigate = useNavigate();
    const [registerMessage, setRegisterMessage] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    async function loginSubmit(e) {
        const formElemet = document.querySelector('#loginForm');
        e.preventDefault();
        const formData = new FormData(formElemet);
        const username = formData.get('username');
        const password = formData.get('password');
        const login = await fetch(`http://localhost:3000/login`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
          },
          body: JSON.stringify({username, password})
        })
        const data = await login.json();
        console.log(data);
        // if (data.loggedIn) {
        //   setIsLoggedIn(true);
        //   setUserId(data.userId)
        //   setUsername(data.username);
        // }
        if (data.loggedIn) {
            navigate('/game', {state: data});
        } else {
            setLoginMessage(data.message);
        }
    }

    async function registerSubmit(e) {
        const formElemet = document.querySelector('#registerForm');
            e.preventDefault();
            const formData = new FormData(formElemet);
            const username = formData.get('username');
            const password = formData.get('password');
            const registerResponse = await fetch(`http://localhost:3000/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({username, password})
            })
            const responseMessage = await registerResponse.json();
            // console.log(cr);
            setRegisterMessage(responseMessage.message);
    }

    function guestSubmit() {
        navigate('/game');
    }


    return (
        <div className='home-container'>
            <div>
                <Button text={"Play as guest"} handleClick={guestSubmit} />
            </div>
            <br />
            <div>
                -- OR --
                <br />
                -- Log in/register to track stats --
            </div>
            <div className='submit-container'>
                <div>
                    Log in:
                    <form id='loginForm' action="/login" method="post">
                        <label htmlFor="lusername">Username: </label>
                        <input type="text" id='lusername' name='username'/>
                        <br />
                        <label htmlFor="lpassword">Password: </label>
                        <input type="password" id='lpassword' name='password'/>
                        <br />
                        <div className='error-message'>
                            {loginMessage ? loginMessage : <br />}
                        </div>
                        <Button text={"Submit"} handleClick={loginSubmit} />
                    </form>
                </div>
                <br />
                <br />
                <br />
                <br />
                <div>
                Register:
                <form id='registerForm' action="/register" method='post'>
                    <label htmlFor="rusername">Username: </label>
                    <input type="text" id='rusername' name='username'/>
                    <br />
                    <label htmlFor="rpassword">Password: </label>
                    <input type="password" id='rpassword' name='password'/>
                    <br />
                    <div className='error-message'>
                        {registerMessage ? registerMessage : <br />}
                    </div>
                        <Button text={"Submit"} handleClick={registerSubmit} />
                </form>
                </div>
            </div>
        </div>
    )
}

export default Home
