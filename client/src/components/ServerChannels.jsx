import React from "react";
import ChannelRows from "./ChannelRows";

export default function ServerChannels({ channels }) {

    return (
        <div>
            {channels.map((channel) => (
                <div key={channel.id}>
                    <ChannelRows channel={channel} />
                </div>
            ))}
            <button onClick={handleToggleForm}>Add Channel+</button>
            {showAddChannelForm && <AddChaannelForm server={server} onToggleForm={handleToggleForm} />}
        </div>
    );


}