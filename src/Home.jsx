import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

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
        // console.log(data);
        // if (data.loggedIn) {
        //   setIsLoggedIn(true);
        //   setUserId(data.userId)
        //   setUsername(data.username);
        // }
        navigate('/game', {state: data});
    }

    async function registerSubmit(e) {
        const formElemet = document.querySelector('#registerForm');
            e.preventDefault();
            const formData = new FormData(formElemet);
            const username = formData.get('username');
            const password = formData.get('password');
            await fetch(`http://localhost:3000/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({username, password})
            })
    }


    return (
        <>
            <div>
                <Link to="/game">Play as guest</Link>
            </div>        
            <div>
                <div>
                Log in to track stats:
                <form id='loginForm' action="/login" method="post">
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' name='username'/>
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="text" id='password' name='password'/>
                    <br />
                    <button onClick={loginSubmit}>Submit</button>
                </form>
                </div>
                <br />
                <br />
                <br />
                <br />
                <div>
                Or register:
                <form id='registerForm' action="/register" method='post'>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' name='username'/>
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="text" id='password' name='password'/>
                    <br />
                    <button onClick={registerSubmit}>Submit</button>
                </form>
                </div>
            </div>
        </>
    )
}

export default Home
