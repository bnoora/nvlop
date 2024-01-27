import axios from "axios";
import react, { useEffect, useState } from "react";

export default function AddChannelForm({ server, onToggleForm }) {
    const serverId = server.id;
    const { channelName, setChannelName } = useState('');
    const { channelDescription, setChannelDescription } = useState('');



    async function handleChannelAdd(event) {
        event.preventDefault();
        const channelName = event.target.elements.channelName.value;
        if (!channelName) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/create-channel', { serverId: serverId, 
                                                                                        channelName: channelName,  
                                                                                        channelDescription: channelDescription});
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

    return (
        <div>
            <form onSubmit={handleChannelAdd}>
                <input type="text" placeholder="Channel Name" onChange={(e) => setChannelName(e.target.value)} />
                <input type="text" placeholder="Channel Description" onChange={(e) => setChannelDescription(e.target.value)} />
                <button type="submit">Add Channel</button>
                <button type="button" onClick={onToggleForm}>Cancel</button>
            </form>
        </div>
    );
}
