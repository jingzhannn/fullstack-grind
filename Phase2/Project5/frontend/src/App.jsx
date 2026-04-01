import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import SignUp from './pages/signup'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App
