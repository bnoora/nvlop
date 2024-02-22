import { useEffect, useState } from "react";
import axios from 'axios';

import ServerChannels from "./ServerChannels";
import MessageComponent from "./MessageComponent";

export default function ServerComponent(props) {
    const { server, onToggleForm } = props;
    const [channels, setChannels] = useState([]);
    const firstChannel = channels[0];
    const [selectedChannel, setSelectedChannel] = useState(firstChannel);

    async function getChannels() {
        try {
            const response = await axios.get('http://localhost:3001/api/channels/get-channels', { 
                params: { serverId: server.server_id }
            });
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
        if (!server) {
            return;
        }
        getChannels();
    }, [server]);

    useEffect(() => {
        if (channels === undefined || channels.length === 0) {
            return;
        }
    }, [channels]);

    const handleChannelClick = (channel) => {
        setSelectedChannel(channel);
    };
    
    return (
        <div>
            <div>
                <h1>{server.name}</h1>
                <ServerChannels channels={channels} onChannelClick={handleChannelClick} 
                                onToggleForm={onToggleForm} />
            </div>
            <MessageComponent server={server} channels={selectedChannel} privateMsg={false} />
        </div>
    );
}