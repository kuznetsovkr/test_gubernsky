import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import avatarImage from './avatarImage.jpg';


const SettingsCard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        avatar: '',
    });

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogout = () => {
        navigate('/');
    };

    // Заглушка для загрузки данных пользователя
    useEffect(() => {
        const mockFetchUserData = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        name: 'Кирилл Кузнецов',
                        email: 'kuznetsovkr@yandex.ru',
                        avatar: avatarImage,
                    });
                }, 1000);
            });
        };

        const fetchUserData = async () => {
            const data = await mockFetchUserData();
            setUserData(data);
        };

        fetchUserData();
    }, []);

    // Функция заглушка для сохранения изменений
    const mockSaveUserData = (newUserData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        });
    };

    const handleSave = async () => {
        setLoading(true);
        const response = await mockSaveUserData(userData);
        setLoading(false);
        if (response.success) {
            setMessage('Настройки успешно обновлены!');
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserData((prev) => ({ ...prev, avatar: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div className="settingsCard">
                <h2>Личные настройки</h2>
                <div className="avatar-section">
                    <img
                        src={userData.avatar}
                        alt="User Avatar"
                        className="avatar"
                    />
                    <input type="file" accept="image/*" onChange={handleAvatarChange}/>
                </div>

                <div className="form-group">
                    <label>Имя:</label>
                    <input
                        type="text"
                        className="input-field"
                        value={userData.name}
                        onChange={(e) =>
                            setUserData({...userData, name: e.target.value})
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={userData.email}
                        className="input-field"
                        onChange={(e) =>
                            setUserData({...userData, email: e.target.value})
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        className="input-field"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Любимая аптека:</label>
                    <input
                        type="favorite"
                        className="input-field"
                        value={"Губернские аптеки"}
                        disabled
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {message && <p style={{color: 'green'}}>{message}</p>}
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button className="saveChanges" onClick={handleSave} disabled={loading}>
                        {loading ? 'Сохранение...' : 'Сохранить изменения'}
                    </button>
                    <button className="exitSettings" onClick={handleLogout} disabled={loading}>
                        {loading ? 'Выход...' : 'Выйти'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsCard;
