import React, { useState, useEffect } from 'react';

const ThemeSelector = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            setTheme(localTheme);
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [theme]);

    return (
        <div className="p-2 text-center">
            <button onClick={toggleTheme} className="text-lg">
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </div>
    );
};

export default ThemeSelector;
