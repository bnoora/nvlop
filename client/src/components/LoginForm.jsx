import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onRegisterClick }) {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        setError(null); 
    }, [username, password]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username && password) {
            try {
                await login(username, password);
                navigate('/main');
            } catch (error) {
                setError(error.message);
            }
        } else {
            setError('Please enter a username and password');
        }
    };

    const handleTrialLogin = async () => {
        setUsername('trial');
        setPassword('trial');
        try {
            await login('trial', 'trial');
        } catch (error) {
            setError(error.message);
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
            <button type="submit" disabled={!username || !password}>Login</button>
            {error && <div>{error}</div>}
            <button type="button" onClick={onRegisterClick}>Register</button>
            <button type="button" onClick={handleTrialLogin}>Trial Login</button>
        </form>
    );
}
