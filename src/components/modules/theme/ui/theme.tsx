import React from 'react';
import { useTheme } from './theme-provider';
import '../style/theme.css'

const ThemeToggle: React.FC = () => {
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <div>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={isDarkTheme}
                    onChange={toggleTheme}
                />
                <span className="slider round"></span>
            </label>
        </div>
    );
};

export default ThemeToggle;