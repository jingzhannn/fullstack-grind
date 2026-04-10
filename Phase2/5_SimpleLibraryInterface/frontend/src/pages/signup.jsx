import { useState } from 'react'
import { Link } from 'react-router-dom'
import './auth.css'
import axios from 'axios'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState("Account Created Successfully")

  async function handleSubmit(e) {
    e.preventDefault()

    let isSuccess = false;
    let message = "User Created Successfully";

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try{
      const res = await axios.post("http://localhost:3000/createUser", {
        username: username,
        password: password
      });
      console.log({ "message": "Account Created Successfully", 'data': res.data });
    } catch (err){
      setError(err);
      message = err;
      console.error({'message': 'Account Creation Unsuccessful', 'Error': err});  
    }

    alert(message);
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-label="Sign up form card">
        <h1 className="login-title">Sign Up</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="sr-only" htmlFor="signupPassword">Password</label>
          <input
            id="signupPassword"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />

          <label className="sr-only" htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />

          <button type="submit">Create Account</button>
        </form>
      </section>
    </main>
  )
}

export default SignUp
