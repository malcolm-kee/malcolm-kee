import { Link } from 'gatsby';
import React from 'react';

export const Header = React.memo(function Header() {
  return (
    <>
      <div className="fixed h-1 top-0 w-full bg-primary-700 z-10" />
      <header className="bg-primary-700 py-3 shadow lg:fixed top-0 w-full z-10">
        <div className="container mx-auto px-4">
          <h1 className="font-medium text-lg xs:text-2xl sm:text-3xl md:text-4xl animated text-gray-100 lg:text-right">
            <Link to="/">
              <span>Malcolm</span> <span>Kee</span>
            </Link>
          </h1>
        </div>
      </header>
    </>
  );
});
