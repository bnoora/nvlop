import react, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    // Check if user is logged in and has a valid cookie
    useEffect(() => {
        function checkLoginStatus() {
            const userCookie = Cookies.get('user');
            if (userCookie) {
                const user = JSON.parse(userCookie);
                setUser(user);
                setIsLoggedIn(true);
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
                Cookies.set('user', JSON.stringify(response.data.user), { expires: 30 });
            } else if (response.status === 401) {
                throw new Error('Invalid credentials');
            } else {
                throw new Error('Unable to login, please try again later.');
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        Cookies.remove('user');
    };

    const register = async (username, password, email) => {
        try {
            const response = await axios.post('http://localhost:3001/register', { username, password, email });
            if (response.status === 200) {
                setIsLoggedIn(true);
                setUser(response.data.user);
                Cookies.set('user', JSON.stringify(response.data.user), { expires: 30 });
            } else if (response.status === 401) {
                throw new Error('Username or email already exists');
            } else {
                throw new Error('Unable to register, please try again later.');
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user, register }}>
        {children}
        </AuthContext.Provider>
    );
};