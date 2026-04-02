import { useState } from 'react'
import { Link } from 'react-router-dom'
import './auth.css'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setError('')
    console.log({ username, password })
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

          {error ? <p className="auth-error" role="alert">{error}</p> : null}

          <button type="submit">Create Account</button>
        </form>

        <div className="login-meta">
          <p>
            Already have an account? <Link to="/login" className="signup-link">Log in</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default SignUp
