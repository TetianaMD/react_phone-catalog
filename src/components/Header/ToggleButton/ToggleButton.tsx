import classNames from 'classnames';
import styles from './toggleButton.module.scss';
import { useEffect, useState } from 'react';

export const ToggleButton = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme} className={classNames(styles.themeButton)}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
};
