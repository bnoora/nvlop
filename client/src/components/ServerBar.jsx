import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import ServerIcon from "./partials/ServerIcon";

export default function ServerBar() {
    const { user } = useContext(AuthContext);
    const { servers } = useContext(UserContext);
    const [showAddServerForm, setShowAddServerForm] = useState(false);
    const [error, setError] = useState(null);

    const handleToggleForm = () => {
        setShowAddServerForm(!showAddServerForm);
    };

    useEffect(() => {
    }, [servers]);

    return (
        <div>
            {servers.map((server) => (
                <div key={server.id}>
                    <ServerIcon server={server} />
                </div>
            ))}
            <button onClick={handleToggleForm}>Add Server</button>
        </div>
    );
}
