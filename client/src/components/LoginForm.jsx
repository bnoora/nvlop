import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

export default function LoginForm() {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username && password) {
            try {
                await login(username, password);
            } catch (error) {
                setError(error.message);
            }
        } else {
            setError('Please enter a username and password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {error && <div>{error}</div>}
        </form>
    );
}
