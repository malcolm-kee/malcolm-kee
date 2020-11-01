import { Link } from 'gatsby';
import * as React from 'react';

export const Header = React.memo(function Header() {
  return (
    <>
      <div className="fixed h-1 top-0 w-full bg-primary-700 z-10" />
      <header className="bg-primary-700 py-3 shadow w-full">
        <div className="container mx-auto px-4">
          <h1 className="font-medium text-lg xs:text-2xl sm:text-3xl md:text-4xl animated text-gray-100 lg:text-right">
            <Link
              to="/"
              className="px-3 rounded border-2 border-primary-700 focus:outline-none focus:border-white"
            >
              <span
                tabIndex={-1}
                className="relative inline-block focus:outline-none"
              >
                <span>Malcolm</span> <span>Kee</span>
              </span>
            </Link>
          </h1>
        </div>
      </header>
    </>
  );
});
