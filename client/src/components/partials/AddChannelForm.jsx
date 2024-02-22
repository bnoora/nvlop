import axios from "axios";
import React, { useState } from "react";

export default function AddChannelForm({ server, onToggleForm }) {
    const serverId = server.server_id;
    const [ channelName, setChannelName ] = useState('');
    const [ channelDescription, setChannelDescription ] = useState('');



    async function handleChannelAdd(event) {
        event.preventDefault();
        if (!channelName) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/api/channels/create-channel', { server_id: serverId, 
                                                                                        channel_name: channelName,  
                                                                                        description: channelDescription});
            if (response.status === 200) {
                channels.push(response.data.channel);
                onToggleForm();
            } else {
                throw new Error('Unable to add channel');
            }
        }
        catch (error) {
            throw error;
        }
    }

    function handleChannelNameChange(event) {
        setChannelName(event.target.value);
    }

    function handleChannelDescriptionChange(event) {
        setChannelDescription(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleChannelAdd}>
                <input type="text" placeholder="Channel Name" onChange={handleChannelNameChange} />
                <input type="text" placeholder="Channel Description" onChange={handleChannelDescriptionChange} />
                <button type="submit">Add Channel</button>
                <button type="button" onClick={onToggleForm}>Cancel</button>
            </form>
        </div>
    );
}
