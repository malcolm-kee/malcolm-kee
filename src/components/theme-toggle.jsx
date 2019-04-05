import React from 'react';
import { Toggle } from './toggle';
import { useTheme } from '../theme';
import './theme-toggle.scss';

export function ThemeToggle() {
  const { value, toggle } = useTheme();
  return (
    <div className="theme-toggle">
      <span>Dark Mode</span>
      <Toggle checked={value === 'dark'} onChange={toggle} />
    </div>
  );
}
