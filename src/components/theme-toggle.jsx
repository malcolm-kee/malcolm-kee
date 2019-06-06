import React from 'react';
import { Toggle } from './toggle';
import moon from '../assets/moon.png';
import sun from '../assets/sun.png';
import { useTheme } from '../theme';
import './theme-toggle.scss';

export function ThemeToggle(toggleProps) {
  const { value, toggle } = useTheme();
  return (
    <div className="theme-toggle">
      <Toggle
        {...toggleProps}
        icons={{
          checked: (
            <img
              src={moon}
              width="16"
              height="16"
              role="presentation"
              style={{ pointerEvents: 'none' }}
              alt="Dark Mode"
            />
          ),
          unchecked: (
            <img
              src={sun}
              width="16"
              height="16"
              role="presentation"
              style={{ pointerEvents: 'none' }}
              alt="Light Mode"
            />
          )
        }}
        checked={value === 'dark'}
        onChange={toggle}
      />
    </div>
  );
}
