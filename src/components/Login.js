import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onRegisterClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Функция-заглушка для обработки логина
    const mockLogin = async (email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email === "kuznetsovkr@yandex.ru" && password === "password") {
                    resolve({ success: true, token: "mockToken123" });
                } else {
                    resolve({ success: false, error: "Неверные учетные данные" });
                }
            }, 1000);
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!validateEmail(email)) {
            setLoading(false);
            setError('Неверный формат электронной почты');
            return;
        }

        const response = await mockLogin(email, password);

        setLoading(false);

        if (response.success) {
            console.log("Успешно вошел в систему!", response.token);
            // Логика после успешного входа
            navigate('/settings');
        } else {
            setError(response.error);
        }
    };

    return (
        <div>
            <p style={{fontSize: "32px", fontWeight: "500", textAlign: "center"}}>Авторизация</p>
            <form style={{padding: '10px 0', height: "150px"}} onSubmit={handleLogin}>
                <div>
                    <input
                        type="email"
                        value={email}
                        placeholder="Введите ваш Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        placeholder="Введите ваш пароль"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <p>
                    Нет аккаунта?{' '}
                    <span style={{color: 'blue', cursor: 'pointer'}} onClick={onRegisterClick}>
                        Зарегистрируйтесь
                    </span>
                </p>
                <button type="submit" disabled={loading}>
                    {loading ? 'Авторизация...' : 'Войти'}
                </button>
            </form>
        </div>
    );
};

export default Login;
