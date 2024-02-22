import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function AddServerForm({ onToggleForm, handleAddServer }) {
    const { servers } = useContext(UserContext);
    const { userId } = useContext(AuthContext);
    const [serverName, setServerName] = useState('');
    
    async function handleServerAdd (event) {
        event.preventDefault();
        if (!serverName || !userId) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/api/servers/add-server', { serverName, userId });
            if (response.status === 200) {
                handleAddServer(response.data);
                onToggleForm();
            } else {
                throw new Error('Unable to add server');
            }
        } catch (error) {
            throw error;
        }
    }

    function handleServerNameChange(event) {
        setServerName(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleServerAdd}>
                <input type="text" placeholder="Server Name" onChange={handleServerNameChange}/>
                <button type="submit">Add Server</button>
                <button type="button" onClick={onToggleForm}>Cancel</button>
            </form>
        </div>
    );
}