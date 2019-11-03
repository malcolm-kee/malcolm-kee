import { Link } from 'gatsby';
import React from 'react';
import { ThemeToggle } from '../theme-toggle';
import { getContrastTextColor } from '../../helper';
import './navbar.scss';

export const Navbar = ({
  title,
  linkTarget = '/',
  backgroundColor = '#e44d26',
  color = getContrastTextColor(backgroundColor),
}) => (
  <>
    <header className="workshop-navbar" style={{ backgroundColor, color }}>
      <Link to={linkTarget}>{title}</Link>
      <div className="workshop-navbar-toolbar">
        <ThemeToggle />
      </div>
    </header>
    <div className="workshop-navbar-line" style={{ backgroundColor }} />
  </>
);
