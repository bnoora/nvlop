import React from "react";
import ChannelRows from "./ChannelRows";

export default function ServerChannels(props) {
    const { channels, onChannelClick } = props;

    return (
        <div>
            {channels.map((channel) => (
                <div key={channel.id}>
                    <ChannelRows channel={channel} onChannelClick={onChannelClick} />
                </div>
            ))}
            <button onClick={handleToggleForm}>Add Channel+</button>
            {showAddChannelForm && <AddChaannelForm server={server} onToggleForm={handleToggleForm} />}
        </div>
    );


}