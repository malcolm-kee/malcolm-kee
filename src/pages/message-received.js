import React from 'react';
import { RoundedLinkButton } from '../components/Button';
import { MainContent } from '../components/main-content';

const MessageReceived = () => (
  <MainContent className="text-center">
    <h1 className="text-4xl my-4">Thank You!</h1>
    <p className="v-space">I've received your message.</p>
    <p className="v-space">You will receive my response soon!</p>
    <nav className="text-center py-2 my-2">
      <RoundedLinkButton to="/">Home</RoundedLinkButton>
    </nav>
  </MainContent>
);

export default MessageReceived;
