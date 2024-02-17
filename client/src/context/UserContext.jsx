import react, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import io from 'socket.io-client';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { user, isLoading, userId } = useContext(AuthContext);
    const [servers, setServers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [sessionToken, setSessionToken] = useState(''); // This is the session token for the user

    // useEffect(() => {
    //     function doesCookieExist(cookieName) {
    //         const cookies = document.cookie.split(';');
    //         return cookies.some(cookie => cookie.trim().startsWith(`${cookieName}=`));
    //     }
        
    //     // Usage
    //     if (doesCookieExist('token')) {
    //         console.log('Cookie exists');
    //     } else {
    //         console.log('Cookie does not exist');
    //     }        
    // }, [user]);

    // get the session token for the user

    // useEffect(() => {
    //     console.log(isLoading);
    //     console.log(user);
    //     console.log(userId);
    // }, [isLoading, user, userId]);

    useEffect(() => {
        if (isLoading || !user || !userId) return;
        async function getSessionToken() {
            try {
                console.log('getting session token');
                const response = await axios.post('http://localhost:3001/api/auth/socket-auth', 
                { params: { user_id: userId }}, 
                { withCredentials: true
                });       
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
    }, [user, isLoading, userId]);


    // Connect to the socket server
    useEffect(() => {
        // if (isLoading || !user || userId) return;
        if (!sessionToken) return;
        console.log('connecting to socket server');

        const socket = io('http://localhost:3001', {
            auth: {
                token: sessionToken,
            },
        });

        socket.on('connect', () => console.log('Connected to socket server'));

        socket.on('disconnect', () => console.log('Disconnected from socket server'));

        return () => socket.disconnect(); // Disconnect the socket when the component unmounts
    }, [sessionToken]);

    // Get all servers for the user
    useEffect(() => {
        if (isLoading || !user || !userId) return;
        async function getServers() {
            try {
                const response = await axios.get('http://localhost:3001/api/servers/get-user-servers', {
                    params: { user_id: userId }
                });
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
    }, [user, isLoading, userId]);

    // Get all friends for the user
    useEffect(() => {
        if (isLoading || !user || userId) return;
        async function getFriends() {
            try {
                const response = await axios.get(`http://localhost:3001/api/servers/get-user-servers`, {
                    params: { user_id: userId }
                });
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
    }, [user, isLoading, userId]);

    return (
        <UserContext.Provider value={{ servers, friends }}>
            {children}
        </UserContext.Provider>
    );

}

