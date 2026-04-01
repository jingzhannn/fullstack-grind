import { Navigate, Route, Routes } from 'react-router-dom'
import LoginCard from './components/loginCard'
import SignUp from './pages/signup'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginCard />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App
