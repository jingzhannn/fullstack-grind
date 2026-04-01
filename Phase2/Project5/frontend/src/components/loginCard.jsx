import { useState } from 'react'
import { Link } from 'react-router-dom'
import './loginCard.css'

const LoginCard = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-label="Login form card">
        <h1 className="login-title">Log In</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="sr-only" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Log In</button>
        </form>

        <div className="login-meta">
          <button type="button" className="forgot-link">Forgot password?</button>
          <p>
            New here? <Link to="/signup" className="signup-link">Sign up</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default LoginCard