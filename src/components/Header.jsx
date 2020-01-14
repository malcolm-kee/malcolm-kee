import cx from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import './Header.scss';

export const Header = React.memo(function Header({ isBanner }) {
  return (
    <>
      <div
        className={cx(
          'heading-line-top',
          isBanner && 'heading-line-top--hidden'
        )}
      />
      <div
        className={cx(
          'Header-outer-container',
          isBanner && 'Header-outer-container-banner'
        )}
      >
        <header
          className={cx(
            'Header mx-auto animated',
            isBanner && 'Header--banner'
          )}
        >
          <div className="heading-container animated">
            <div className="heading animated">
              <h1
                className={cx(
                  'font-medium text-2xl xs:text-3xl sm:text-4xl animated',
                  isBanner ? 'text-primary-600 md:text-6xl' : 'text-gray-100'
                )}
              >
                <Link to="/" tabIndex={isBanner ? -1 : undefined}>
                  <span>Malcolm</span> <span>Kee</span>
                </Link>
              </h1>
            </div>
          </div>
        </header>
      </div>
    </>
  );
});
