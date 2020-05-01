import * as React from 'react';
import { RoundedLinkButton } from '../components/Button';
import { MainContent } from '../components/main-content';
import { Seo } from '../components/Seo';

const NotFoundPage = () => (
  <MainContent>
    <Seo title="Page Not Found" />
    <div className="text-center">
      <h1 className="text-5xl my-4">Page Not Found</h1>
      <div>
        <p>The page doesn&#39;t exist... the sadness.</p>
        <nav className="text-center py-2 my-4">
          <RoundedLinkButton to="/">Home</RoundedLinkButton>
        </nav>
      </div>
    </div>
  </MainContent>
);

export default NotFoundPage;
