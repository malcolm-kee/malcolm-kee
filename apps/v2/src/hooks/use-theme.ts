import * as React from 'react';
import mitt from 'mitt';

const THEMES = ['light', 'dark', 'system'] as const;

export type ThemeValue = (typeof THEMES)[number];

const eventBus = mitt<{
  themeChange: ThemeValue | undefined;
}>();

export const useThemeToggle = () => {
  const [selectedTheme, _setSelectedTheme] = React.useState<undefined | ThemeValue>();

  const setSelectedTheme = React.useCallback((nextTheme: ThemeValue | undefined) => {
    _setSelectedTheme(nextTheme);
    eventBus.emit('themeChange', nextTheme);
  }, []);

  React.useEffect(() => {
    if (selectedTheme) {
      document.documentElement.setAttribute('data-theme', selectedTheme);
    } else {
      const currentTheme = THEMES.find(
        (theme) => theme === document.documentElement.getAttribute('data-theme')
      );

      setSelectedTheme(currentTheme);
    }
  }, [selectedTheme]);

  React.useEffect(() => {
    let handler = () => {
      const currentTheme = THEMES.find(
        (theme) => theme === (window.localStorage.theme ?? 'system')
      );
      setSelectedTheme(currentTheme);
    };

    window.addEventListener('storage', handler);

    return () => window.removeEventListener('storage', handler);
  }, []);

  return [selectedTheme, setSelectedTheme] as const;
};

export const useThemeValue = () => {
  const [systemIsDarkMode, setSystemIsDarkMode] = React.useState(false);
  const [themeValue, setThemeValue] = React.useState<undefined | ThemeValue>();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
      setSystemIsDarkMode(isDarkMode.matches);
    }

    const currentTheme = THEMES.find(
      (theme) => theme === document.documentElement.getAttribute('data-theme')
    );

    setThemeValue(currentTheme);

    eventBus.on('themeChange', setThemeValue);

    return () => eventBus.off('themeChange', setThemeValue);
  }, []);

  return themeValue === 'system' ? (systemIsDarkMode ? 'dark' : 'light') : themeValue;
};
