import React, { useState, useEffect, useContext } from 'react';
import TopMessageBar from "./partials/TopMessageBar";
import MessageRow from './partials/MessageRow';
import MessageInput from './partials/MessageInput';
import { UserContext } from "../context/UserContext";

export default function MessageComponent(props) {
    const { server, channel, privateMsg, friend } = props;
    const {user} = useContext(UserContext);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        console.log("MessageComponent rendered");
    }, [messages]);

    const handleSendMessage = (msg) => {
        messages.push(msg);
        setMessages(messages);
        // TODO: send message to server and socket 
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