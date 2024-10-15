import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SettingsCard from './components/SettingsCard';
import HomePage from './components/HomePage';
import './components/App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/settings" element={<SettingsCard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
