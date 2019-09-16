import cx from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import './Header.scss';

export const Header = React.memo(({ isBanner }) => (
  <div
    className={cx(
      'Header-outer-container',
      isBanner && 'Header-outer-container-banner'
    )}
  >
    <header className={cx('Header', isBanner && 'Header--banner')}>
      <div className="heading-container">
        <div className="heading">
          <h1>
            <Link to="/" tabIndex={isBanner ? -1 : undefined}>
              <span>Malcolm</span> <span>Kee</span>
            </Link>
          </h1>
        </div>
      </div>
    </header>
  </div>
));
