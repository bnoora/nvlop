import React, { useState } from "react";

export default function MessageInput({ onSendMessage }) {
    const [message, setMessage] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        onSendMessage(message);
        setMessage("");
    };

    return (
        <div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}