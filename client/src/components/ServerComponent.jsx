import { useEffect, useState } from "react";
import axios from 'axios';

import ServerChannels from "./ServerChannels";
import MessageComponent from "./MessageComponent";

export default function ServerComponent({ server }) {
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);

    async function getChannels() {
        try {
            const response = await axios.get('http://localhost:3001/get-channels', { serverId: server.id });
            if (response.status === 200) {
                setChannels(response.data.channels);
            } else {
                throw new Error('Unable to get channels');
            }
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getChannels();
        setSelectedChannel(channels[0]);
    }, []);

    const handleChannelClick = (channel) => {
        setSelectedChannel(channel);
    };
    
    return (
        <div>
            <div>
                <h1>{server.name}</h1>
                <ServerChannels channels={channels} onChannelClick={handleChannelClick} />
            </div>
            <MessageComponent server={server} channel={selectedChannel} privateMsg={false} />
        </div>
    );
}