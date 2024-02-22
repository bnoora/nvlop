import React, { useState, useEffect, useContext } from 'react';
import TopMessageBar from "./partials/TopMessageBar";
import MessageRow from './partials/MessageRow';
import MessageInput from './partials/MessageInput';
import { SocketContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

export default function MessageComponent(props) {
    const {channel} = props;
    const {user} = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState([]);

    async function sendNewMessage(msg) {
        try {
            const response = await axios.post('http://localhost:3001/api/messages/create-message', {
                message: msg,
                user_id: user.user_id,
                channel_id: channel.channel_id
            });
            if (response.status === 200) {
                setMessages([...messages, response.data.message]);
            } else {
                throw new Error('Unable to send message');
            }
        } catch (error) {
            throw error;
        }
    }

    async function getMessages() {
        try {
            const response = await axios.get('http://localhost:3001/api/messages/get-messages', {
                params: { channel: channel.channel_id }
            });
            if (response.status === 200) {
                console.log(response.data);
                setMessages(response.data.messages);
            } else {
                throw new Error('Unable to get messages');
            }
        } catch (error) {
            throw error;
        }
    }

    useEffect (() => {
        if (!channel) {
            return;
        }
        getMessages();
    }, [channel]);

    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.on('receive_message', (msg) => {
            setMessages([...messages, msg]);
        });
    }, [socket, messages]);

    const handleSocketSendMessage = (msg) => {
        socket.emit('send_message', {
            message: msg,
            user: user.user_id,
            channel: channel
        });
    };

    const handleSendMessage = (msg) => {
        handleSocketSendMessage(msg);
        sendNewMessage(msg);
    };

    if (!channel) {
        return <div>Channel not found</div>;
    }
    
    return (
        <div>
            <TopMessageBar/>
            {messages.length === 0 || messages === undefined ? <div>No messages</div> : 
            messages.map((message, index) => {
                return <MessageRow key={index} message={message} />;
            })}
            <MessageInput onSendMessage={handleSendMessage}/>
        </div>
    );
}