import React from 'react';

type ThemeValue = 'light' | 'dark';

type ThemeContext = [ThemeValue, () => void];

export const ThemeContext = React.createContext<ThemeContext>([
  'light',
  function toggleTheme() {},
]);

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => React.useContext(ThemeContext);
