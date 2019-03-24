import { Link } from 'gatsby';
import { joinClassName } from 'join-string';
import React from 'react';
import './Header.scss';

export const Header = React.memo(({ isBanner }) => (
  <div
    className={joinClassName(
      'Header-outer-container',
      isBanner && 'Header-outer-container-banner'
    )}
  >
    <header className={joinClassName('Header', isBanner && 'Header--banner')}>
      <div className="heading-container">
        <div className="heading">
          <h1>
            <Link to="/">
              <span>Malcolm</span> <span>Kee</span>
            </Link>
          </h1>
        </div>
      </div>
    </header>
  </div>
));
