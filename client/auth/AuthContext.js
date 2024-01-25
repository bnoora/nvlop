import react, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    let navigate = useNavigate();

    // Check if user is logged in and has a valid cookie
    useEffect(() => {
        const checkLoginStatus = () => {
            const userCookie = Cookies.get('user');
            if (userCookie) {
                setIsLoggedIn(true);
                setUser(JSON.parse(userCookie));
            }
        };
        checkLoginStatus();
    }, []);

    
    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            if (response.status === 200) {
                setIsLoggedIn(true);
                setUser(response.data.user);
                Cookies.set('user', JSON.stringify(response.data.user), { expires: 30 });
                navigate('/'); 
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
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};