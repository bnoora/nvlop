import React, { useState } from "react";
import ServerIcon from "./partials/ServerIcon";

export default function ServerBar(props) {
    const { onServerClick, onFriendClick, servers, onToggleForm } = props;
    
    if (!servers) {
        return <div>Loading...</div>; // Or any other placeholder you wish to show
    }

    return (
        <div id="serverbar">
            <button onClick={onFriendClick}>Friends</button>
            {
                servers.length === 0 ? (
                    <div>No servers</div>
                ) : (
                    servers.map((server) => (
                    <div key={server.server_id}>
                        <ServerIcon server={server} onClick={() => onServerClick(server)}/>
                    </div>
                    ))
                )
            }

            <button onClick={onToggleForm}>Add Server+</button>
        </div>
    );
}
