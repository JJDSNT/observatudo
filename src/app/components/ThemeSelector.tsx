'use client'
import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";

const ThemeSelector = () => {
    const { theme, setTheme } = useTheme();
    
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

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
 //avoid hidratation mismatch 
    if (!mounted) {
      return null
    }

    return (
        <div className="p-2 text-center">
            <button aria-label='Toggle Dark Mode' onClick={toggleTheme}>
                {theme === 'light' ? '☀️' : '🌙'}
            </button>
        </div>
    );
};

export default ThemeSelector;
