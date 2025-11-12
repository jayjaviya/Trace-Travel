import React, { createContext, useState, useEffect } from 'react';

// Create the Context
export const ThemeContext = createContext();

// Create the Provider component
export const ThemeProvider = ({ children }) => {
  // Initialize state from local storage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Effect to apply the theme class to the body and save to local storage
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  // The value provided to consumers of the context
  const contextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};