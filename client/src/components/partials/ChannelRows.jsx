import React, { useEffect } from 'react';

export default function ChannelRows(props) {
    const { channel, onChannelClick } = props;

    useEffect(() => {
        if (!channel) {
            return;
        }
    }, [channel]);

    return (
        <div onClick={() => onChannelClick(channel)}>
            <div>{channel.channel_name}</div>
        </div>
    );
}