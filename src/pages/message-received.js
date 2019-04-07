import { Link } from 'gatsby';
import React from 'react';
import { MainContent } from '../components/main-content';
import { Typography } from '../components/Typography';

const MessageReceived = () => (
  <MainContent className="text-center">
    <h1>Thank You!</h1>
    <Typography>I've received your message.</Typography>
    <Typography>You will receive my response soon!</Typography>
    <nav className="Toolbar center">
      <Link to="/" className="link-primary">
        Home
      </Link>
    </nav>
  </MainContent>
);

export default MessageReceived;
