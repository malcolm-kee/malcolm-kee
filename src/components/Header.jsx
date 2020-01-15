import { Link } from 'gatsby';
import React from 'react';

export const Header = React.memo(function Header() {
  return (
    <>
      <div className="fixed h-1 top-0 w-full bg-primary-500 z-10" />
      <header className="bg-primary-500 py-3 shadow lg:fixed top-0 w-full z-10">
        <div className="container mx-auto px-4">
          <h1 className="font-medium text-2xl xs:text-3xl sm:text-4xl animated text-gray-100 lg:text-right">
            <Link to="/">
              <span>Malcolm</span> <span>Kee</span>
            </Link>
          </h1>
        </div>
      </header>
    </>
  );
});
