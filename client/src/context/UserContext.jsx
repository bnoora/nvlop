import react, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import io from 'socket.io-client';

export const UserContext = createContext();
export const SocketContext = createContext();

export const UserProvider = ({ children }) => {
    const { user, isLoading, userId } = useContext(AuthContext);
    const [servers, setServers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [sessionToken, setSessionToken] = useState(''); // This is the session token for the user
    const [socket, setSocket] = useState(null);

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

        const newSocket = io('http://localhost:3001', {
            auth: {
                token: sessionToken,
            },
        });

        setSocket(newSocket);
        newSocket.on('connect', () => console.log('Connected to socket server'));
        newSocket.on('disconnect', () => console.log('Disconnected from socket server'));

        return () => newSocket.disconnect(); // Disconnect the socket when the component unmounts
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
                    setServers(response.data);
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
            <SocketContext.Provider value={socket}>
                {children}
            </SocketContext.Provider>
        </UserContext.Provider>
    );

}

