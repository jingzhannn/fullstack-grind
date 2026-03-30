import React from 'react'
import { useState } from 'react'

const LoginCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleClick(e){
    e.preventDefault();
    console.log(username, password);
  }

  return (
    <div>
        <h1>LOGIN</h1>
        <form>
            <h2>Username</h2>
            <input type='text' onChange={(e) => setUsername(e.target.value)}></input>
            <h2>Password</h2>
            <input type='password' onChange={(e) => setPassword(e.target.value)}></input> <br></br>
            <button onClick={handleClick}>Login</button>
        </form>
    </div>
  )
}

export default LoginCard