import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export default function AddServerForm({ onToggleForm }) {
    const { servers } = useContext(UserContext);
    
    async function handleServerAdd (event) {
        event.preventDefault();
        const serverName = event.target.elements.serverName.value;
        if (!serverName || !serverUrl) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/add-server', { serverName, serverUrl });
            if (response.status === 200) {
                servers.push(response.data.server);
                onToggleForm();
            } else {
                throw new Error('Unable to add server');
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        <div>
            <form onSubmit={handleServerAdd}>
                <input type="text" placeholder="Server Name" />
                <input type="text" placeholder="Server URL" />
                <button type="submit">Add Server</button>
                <button type="button" onClick={onToggleForm}>Cancel</button>
            </form>
        </div>
    );
}