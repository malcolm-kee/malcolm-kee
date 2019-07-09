import { Link } from 'gatsby';
import React from 'react';
import { MainContent } from '../components/main-content';

const MessageReceived = () => (
  <MainContent className="text-center">
    <h1>Thank You!</h1>
    <p className="v-space">I've received your message.</p>
    <p className="v-space">You will receive my response soon!</p>
    <nav className="Toolbar center">
      <Link to="/" className="link-primary">
        Home
      </Link>
    </nav>
  </MainContent>
);

export default MessageReceived;
