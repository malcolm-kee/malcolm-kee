import { Link } from 'gatsby';
import React from 'react';

const NotFoundPage = () => (
  <main className="main-content">
    <div className="text-center">
      <h1>NOT FOUND</h1>
      <div>
        <p>The page doesn&#39;t exist... the sadness.</p>
        <nav className="Toolbar center">
          <Link to="/" className="link-primary">
            Home
          </Link>
        </nav>
      </div>
    </div>
  </main>
);

export default NotFoundPage;
