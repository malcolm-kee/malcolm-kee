import { Link } from 'gatsby';
import React from 'react';
import { MainContent } from '../components/main-content';
import { Seo } from '../components/Seo';

const NotFoundPage = () => (
  <MainContent>
    <Seo title="Page Not Found" />
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
  </MainContent>
);

export default NotFoundPage;
