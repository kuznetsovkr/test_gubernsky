import React from 'react';
import { ReactComponent as Logo } from './logo.svg';
import './App.css';

const Header = ({ onLoginClick }) => {
    return (
        <header className="header">
            <div onClick={() => window.location.href = '/'} style={{cursor: 'pointer'}}>
                <Logo/>
            </div>
            <button className="loginButton" onClick={onLoginClick}>
                Войти
            </button>
        </header>
    );
};

export default Header;
