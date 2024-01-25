import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// Components
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function LoginPage() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showLoginForm, setShowLoginForm] = useState(true);

    const handleToggleForm = () => {
        setShowLoginForm(!showLoginForm);
    };

    useEffect(() => {
        if (user) {
            navigate('/main');
        }
    }, [user, navigate]);

    if (user) {
        return null;
    }

    return (
        <div>
            {showLoginForm ? (
                <LoginForm onRegisterClick={handleToggleForm} />
            ) : (
                <RegisterForm onLoginClick={handleToggleForm} />
            )}
        </div>
    );
}
