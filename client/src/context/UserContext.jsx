import react, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import io from 'socket.io-client';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [servers, setServers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [sessionToken, setSessionToken] = useState(''); // This is the session token for the user

    // get the session token for the user
    useEffect(() => {
        async function getSessionToken() {
            try {
                const response = await axios.post('http://localhost:3001/socket-auth');
                if (response.status === 200) {
                    setSessionToken(response.data.sessionToken);
                } else {
                    throw new Error('Unable to get session token');
                }
            } catch (error) {
                throw error;
            }
        }
        getSessionToken();
    }, [user]);


    // Connect to the socket server
    useEffect(() => {
        if (!sessionToken) return;

        const socket = io('http://localhost:3001', {
            auth: {
                token: sessionToken,
            },
        });

        socket.on('connect', () => console.log('Connected to socket server'));

        socket.on('disconnect', () => console.log('Disconnected from socket server'));

        return () => socket.disconnect(); // Disconnect the socket when the component unmounts
    }, [sessionToken]);

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
    }, [user]);

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
    }, [user]);

    return (
        <UserContext.Provider value={{ servers, friends }}>
            {children}
        </UserContext.Provider>
    );

}

