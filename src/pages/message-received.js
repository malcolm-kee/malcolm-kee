import { Link } from 'gatsby';
import React from 'react';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';

const MessageReceived = () => (
  <main className="main-content">
    <h1>Thank You</h1>
    <Typography>I've received your message.</Typography>
    <Typography>You will receive my response soon!</Typography>
    <div className="Toolbar">
      <Button component={Link} to="/" color="primary" raised>
        Home
      </Button>
    </div>
  </main>
);

export default MessageReceived;
