import React from 'react';

const ThemeContext = React.createContext({
  toggle: function noop() {},
  value: null,
});

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => React.useContext(ThemeContext);
