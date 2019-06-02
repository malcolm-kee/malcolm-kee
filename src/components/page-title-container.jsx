import React from 'react';
import { ThemeToggle } from './theme-toggle';
import './page-title-container.scss';

export const PageTitleContainer = ({ title }) => (
  <div className="page-title-container">
    <h1>{title}</h1>
    <ThemeToggle />
  </div>
);
