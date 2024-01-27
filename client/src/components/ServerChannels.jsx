import React from "react";
import ChannelRows from "./ChannelRows";

export default function ServerChannels(props) {
    const { channels, onChannelClick, onToggleForm } = props;

    return (
        <div>
            {channels.map((channel) => (
                <div key={channel.id}>
                    <ChannelRows channel={channel} onChannelClick={onChannelClick} />
                </div>
            ))}
            <button onClick={onToggleForm}>Add Channel+</button>
        </div>
    );
}