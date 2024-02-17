import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function AddServerForm({ onToggleForm }) {
    const { servers } = useContext(UserContext);
    const { userId } = useContext(AuthContext);
    
    async function handleServerAdd (event) {
        event.preventDefault();
        const serverName = event.target.elements.serverName.value;
        if (!serverName || !userId) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/add-server', { serverName, userId });
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
                <button type="submit">Add Server</button>
                <button type="button" onClick={onToggleForm}>Cancel</button>
            </form>
        </div>
    );
}