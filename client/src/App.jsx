import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Contexts
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'

// Pages
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'

function App() {

  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/main" element={<MainPage/>} />
          </Routes>
        </Router>
      </UserProvider>
  </AuthProvider>
  )
}

export default App
