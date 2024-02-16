import react, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        async function checkLoginStatus() {
            try {
                const response = await axios.get('http://localhost:3001/check-login');
                if (response.status === 200 && response.data.isLoggedIn) {
                    setIsLoggedIn(true);
                    setUser(response.data.user);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (error) {
                console.error('Failed to check login status', error);
                setIsLoggedIn(false);
                setUser(null);
            }
        }
        checkLoginStatus();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            if (response.status === 200) {
                setIsLoggedIn(true);
                setUser(response.data.user);
            } else {
                // Handle non 200 res
                throw new Error('Login failed');
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:3001/logout');
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const register = async (username, password, email) => {
        try {
            const response = await axios.post('http://localhost:3001/register', { username, password, email });
            if (response.status === 200) {
                setIsLoggedIn(true);
                setUser(response.data.user);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user, register }}>
            {children}
        </AuthContext.Provider>
    );
};