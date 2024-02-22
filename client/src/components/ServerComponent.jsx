import { useEffect, useState } from "react";
import axios from 'axios';

import ServerChannels from "./ServerChannels";
import MessageComponent from "./MessageComponent";
import AddChannelForm from "./partials/AddChannelForm";

export default function ServerComponent(props) {
    const { server } = props;
    const [channels, setChannels] = useState([]);
    const firstChannel = channels[0];
    const [selectedChannel, setSelectedChannel] = useState(firstChannel);
    const [showAddChannelForm, setShowAddChannelForm] = useState(false);

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
        setSelectedChannel(channels[0]);
    }, [channels]);

    const handleChannelClick = (channel) => {
        setSelectedChannel(channel);
    };

    const addNewChannel = (channel) => {
        setChannels([...channels, channel]);
    };

    const handleToggleAddChannelForm = () => {
        setShowAddChannelForm(!showAddChannelForm);
    };
    
    return (
        <div>
            <div>
                <h1>{server.name}</h1>
                <ServerChannels channels={channels} onChannelClick={handleChannelClick} 
                                onToggleForm={handleToggleAddChannelForm} addNewChannel={addNewChannel} />
            </div>
            <MessageComponent server={server} channel={selectedChannel}/>
            {showAddChannelForm && <AddChannelForm server={server} 
                                    onToggleForm={handleToggleAddChannelForm} 
                                    onAddChannel={addNewChannel} />}
        </div>
    );
}