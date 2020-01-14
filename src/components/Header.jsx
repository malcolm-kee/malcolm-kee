import { Link } from 'gatsby';
import React from 'react';
// import './Header.scss';

export const Header = React.memo(function Header() {
  return (
    <>
      <div className="fixed h-1 top-0 w-full bg-primary-500 z-50" />
      <header className="Header mx-auto animated">
        <div className="heading-container animated">
          <div className="heading animated">
            <h1 className="font-medium text-2xl xs:text-3xl sm:text-4xl animated text-gray-100">
              <Link to="/">
                <span>Malcolm</span> <span>Kee</span>
              </Link>
            </h1>
          </div>
        </div>
      </header>
    </>
  );
});
