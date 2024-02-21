import React from "react";
import ChannelRows from "./partials/ChannelRows";

export default function ServerChannels(props) {
    const { channels, onChannelClick, onToggleForm } = props;

    if (!channels) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={onToggleForm}>Add Channel+</button>
            {
                channels.map((channel) => (
                    <ChannelRows key={channel.channel_id} channel={channel} onClick={onChannelClick} />
                ))
            }
        </div>
    );
}