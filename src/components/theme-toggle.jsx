import React from 'react';
import { Toggle } from './toggle';
import { useTheme } from '../theme';
import './theme-toggle.scss';

export function ThemeToggle(toggleProps) {
  const { value, toggle } = useTheme();
  return (
    <div className="theme-toggle">
      <span className="theme-toggle-label">Dark Mode</span>
      <Toggle {...toggleProps} checked={value === 'dark'} onChange={toggle} />
    </div>
  );
}
