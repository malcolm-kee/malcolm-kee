import { Link } from 'gatsby';
import * as React from 'react';
import { ThemeToggle } from '../theme-toggle';
import './navbar.scss';

export const Navbar = ({ workshop }) => (
  <>
    <header
      className="workshop-navbar"
      style={{
        backgroundColor: workshop.themeColor,
        color: workshop.contrastColor,
      }}
    >
      <Link to={`/${workshop.id}/`}>{workshop.name}</Link>
      <div className="workshop-navbar-toolbar">
        <ThemeToggle />
      </div>
    </header>
    <div
      className="workshop-navbar-line"
      style={{ backgroundColor: workshop.themeColor }}
    />
  </>
);
