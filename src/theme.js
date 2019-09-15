import React from 'react';

const ThemeContext = React.createContext(['light', function toggleTheme() {}]);

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => React.useContext(ThemeContext);
