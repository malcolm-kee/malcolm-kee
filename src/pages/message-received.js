import React from 'react';
import { Link } from 'gatsby';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Layout } from '../components/Layout';
import { Typography } from '../components/Typography';

const MessageReceived = () => (
  <Layout>
    <main className="main-content">
      <h1>Thank You</h1>
      <Typography>I've received your message.</Typography>
      <Typography>You will receive my response soon!</Typography>
      <div className="Toolbar">
        <Button component={Link} to="/" color="primary" raised>
          <Icon>home</Icon> Home
        </Button>
      </div>
    </main>
  </Layout>
);

export default MessageReceived;
