import react, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [servers, setServers] = useState([]);
    const [friends, setFriends] = useState([]);

    // Check if user is logged in and if not redirect to login page
    useEffect(() => {
        if (!user) {
            console.log('User not logged in');
        }
    }, [user]);

    // Get all servers for the user
    useEffect(() => {
        async function getServers() {
            try {
                const response = await axios.get('http://localhost:3001/get-user-servers');
                if (response.status === 200) {
                    setServers(response.data.servers);
                } else {
                    throw new Error('Unable to get servers');
                }
            } catch (error) {
                throw error;
            }
        }
        getServers();
    }, []);

    // Get all friends for the user
    useEffect(() => {
        async function getFriends() {
            try {
                const response = await axios.get('http://localhost:3001/get-friends');
                if (response.status === 200) {
                    setFriends(response.data.friends);
                } else {
                    throw new Error('Unable to get friends');
                }
            } catch (error) {
                throw error;
            }
        }
        getFriends();
    }, []);

    return (
        <UserContext.Provider value={{ servers, friends }}>
            {children}
        </UserContext.Provider>
    );

}

