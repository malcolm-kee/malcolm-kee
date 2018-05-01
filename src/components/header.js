import React from 'react';
import Link from 'gatsby-link';

import './Header.scss';

export const Header = ({ siteTitle }) => (
  <header className="Header">
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <div className="heading">
        <h1 style={{ margin: 0, textAlign: 'right' }}>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            {siteTitle
              .split(' ')
              .map((word, index) => <span key={index}>{word}&nbsp;</span>)}
          </Link>
        </h1>
      </div>
    </div>
  </header>
);
