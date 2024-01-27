import { useEffect } from "react";
import ServerIcon from "./partials/ServerIcon";

export default function ServerBar(props) {
    const { onServerClick, onFriendClick, servers, onAddServer } = props;

    useEffect(() => {
        console.log("ServerBar rendered");
    }, [servers]);

    return (
        <div>
            <button onClick={onFriendClick}>Friends</button>
            {servers.map((server) => (
                <div key={server.id}>
                    <ServerIcon server={server} onClick={() => onServerClick(server)} />
                </div>
            ))}
            <button onClick={onAddServer}>Add Server+</button>
        </div>
    );
}
