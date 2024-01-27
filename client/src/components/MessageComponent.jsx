import React, { useState, useEffect } from 'react';
import TopMessageBar from "./partials/TopMessageBar";
import MessageRow from './partials/MessageRow';
import MessageInput from './partials/MessageInput';

export default function MessageComponent(props) {
    const { server, channel, privateMsg, friend } = props;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log("MessageComponent rendered");
    }, [messages]);

    const handleSendMessage = (msg, userId, privateBool, serverId="", channelId="") => {
        messages.push(msg);
    };
    
    return (
        <div>
            <TopMessageBar privateMsg={privateMsg} friend={friend}/>
            <div>
                {messages.map((msg) => (
                    <MessageRow key={msg.id} message={msg} />
                ))}
            </div>
            <MessageInput onSendMessage={handleSendMessage}/>
        </div>
    );
}