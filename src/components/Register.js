import React, { useState } from 'react';

const Register = ({ onLoginClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Функция-заглушка для регистрации
    const mockRegister = async (email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email !== "kuznetsovkr@yandex.ru") {
                    resolve({ success: true });
                } else {
                    resolve({ success: false, error: "Электронная почта уже существует" });
                }
            }, 1000);
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!validateEmail(email)) {
            setLoading(false);
            setError('Неверный формат электронной почты');
            return;
        }

        if (password !== confirmPassword) {
            setLoading(false);
            setError('Пароли не совпадают');
            return;
        }

        const response = await mockRegister(email, password);

        setLoading(false);

        if (response.success) {
            setMessage('Регистрация прошла успешно! Теперь вы можете войти в систему.');
        } else {
            setError(response.error);
        }
    };

    return (
        <div>
            <p style={{fontSize: "32px", fontWeight: "500", textAlign: "center"}}>Регистрация</p>
            <form style={{padding: '10px 0', height: "230px"}} onSubmit={handleRegister}>
                <div>
                    <input
                        type="email"
                        placeholder="Введите ваш Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Введите ваш Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="Повторите ваш Пароль"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                {message && <p style={{color: 'green'}}>{message}</p>}
                <p>
                    Уже есть аккаунт?{' '}
                    <span style={{color: 'blue', cursor: 'pointer'}} onClick={onLoginClick}>
                    Войдите
                </span>
                </p>
                <button type="submit" disabled={loading}>
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>
        </div>
    );
};

export default Register;
