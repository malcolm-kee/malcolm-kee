import React from 'react';
import Link from 'gatsby-link';

import './Header.scss';

export const Header = ({ siteTitle }) => (
  <header className="Header">
    <div className="heading">
      <h1>
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
  </header>
);
