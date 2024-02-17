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
    const [user_id, setUser_id] = useState(''); // This is the user id for the user

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

    useEffect(() => {
        console.log('User');
        console.log(user);
        if (!user) return;
        setUser_id(user.user_id);
    }, [user]);

    // get the session token for the user
    useEffect(() => {
        if (!user) return;
        console.log(user);
        async function getSessionToken() {
            try {
                const response = await axios.post('http://localhost:3001/api/auth/socket-auth', {params: { user_id: user_id }}, {
                    withCredentials: true
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
    }, [user]);


    // Connect to the socket server
    useEffect(() => {
        if (!user) return;
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

    // Get all servers for the user
    useEffect(() => {
        if (!user) return;
        async function getServers() {
            try {
                // send userid to get all servers for the user

                const response = await axios.get('http://localhost:3001/api/servers/get-user-servers', {
                    params: { user_id: user_id }
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
    }, [user]);

    // Get all friends for the user
    useEffect(() => {
        if (!user) return;
        async function getFriends() {
            try {
                const response = await axios.get(`http://localhost:3001/api/servers/get-user-servers`, {
                    params: { user_id: user_id }
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
    }, [user]);

    return (
        <UserContext.Provider value={{ servers, friends }}>
            {children}
        </UserContext.Provider>
    );

}

