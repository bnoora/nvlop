import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";

export default function RegisterForm({onLoginClick}) {
    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null); 
    }, [username, email, password, confirmPassword]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await register(username, password, email);
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
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" disabled={password !== confirmPassword || !username || !email || !password}>Register</button>
            <button type="button" onClick={onLoginClick}>Login</button>
            {error && <div>{error}</div>}
        </form>
    );
}
