import { Link } from 'gatsby';
import * as React from 'react';
import './navbar.scss';

export const Navbar = ({ workshop }) => (
  <>
    <header
      className="workshop-navbar z-30"
      style={{
        backgroundColor: workshop.themeColor,
        color: workshop.contrastColor,
      }}
    >
      <Link to={`/${workshop.id}/`}>{workshop.name}</Link>
    </header>
    <div
      className="workshop-navbar-line"
      style={{ backgroundColor: workshop.themeColor }}
    />
  </>
);
