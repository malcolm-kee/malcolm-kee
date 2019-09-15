import { useIsJsEnabled } from 'gatsby-plugin-js-fallback';
import React from 'react';
import moon from '../assets/moon.png';
import sun from '../assets/sun.png';
import { useTheme } from '../theme';
import './theme-toggle.scss';
import { Toggle } from './toggle';

export function ThemeToggle(toggleProps) {
  const [theme, toggleTheme] = useTheme();
  const jsEnabled = useIsJsEnabled();
  return jsEnabled ? (
    <div className="theme-toggle">
      <Toggle
        {...toggleProps}
        icons={{
          checked: (
            <img
              src={moon}
              width="16"
              height="16"
              style={{ pointerEvents: 'none' }}
              alt="Dark Mode"
            />
          ),
          unchecked: (
            <img
              src={sun}
              width="16"
              height="16"
              style={{ pointerEvents: 'none' }}
              alt="Light Mode"
            />
          ),
        }}
        checked={theme === 'dark'}
        onChange={toggleTheme}
        aria-label="Switch between Dark and Light mode"
      />
    </div>
  ) : null;
}
