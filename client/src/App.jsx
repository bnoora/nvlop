import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import { useContext } from 'react';

// Contexts
import { AuthProvider, AuthContext } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

// Pages
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {
  	const { isLoggedIn } = useContext(AuthContext);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Navigate replace to={isLoggedIn ? "/main" : "/login"} />} />
				{isLoggedIn ? ( 
					<Route path="/main" element={<MainPage />} />
				) : (
					<Route path="/login" element={<LoginPage />} />
				)}
			</Routes>
		</Router>
	);
}

  export default App
