import React, { useState, useRef } from 'react';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import './App.css';

const HomePage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const modalRef = useRef(null); // Реф для отслеживания кликов

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowRegister(false);
    };

    const handleRegisterClick = () => {
        setShowRegister(true);
        setShowLogin(false);
    };

    const handleCloseModal = () => {
        setShowLogin(false);
        setShowRegister(false);
    };

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleCloseModal();
        }
    };

    return (
        <div>
            <Header onLoginClick={handleLoginClick} />
            {(showLogin || showRegister) && (
                <div className="modalBackground" onClick={handleClickOutside}>
                    <div className="modal" ref={modalRef}>
                        <button className="closeButton" onClick={handleCloseModal}>X</button>
                        {showLogin && <Login onRegisterClick={handleRegisterClick} />}
                        {showRegister && <Register onLoginClick={handleLoginClick} />}
                    </div>
                </div>
            )}
            <div className="content">
                {/* Пустое пространство для стартовой страницы */}
            </div>
        </div>
    );
};

export default HomePage;
