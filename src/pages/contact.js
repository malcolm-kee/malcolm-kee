import React from 'react';
import Link from 'gatsby-link';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import twitterIcon from '../assets/twitter-icon.png';
import meetupIcon from '../assets/meetup-icon.svg';
import './contact.css';

const ContactItem = ({ link, children }) => (
  <div className="ContactItem">
    <Button
      component="a"
      href={link}
      target="_BLANK"
      style={{
        color: 'inherit',
      }}
      raised
    >
      {children}
    </Button>
  </div>
);

const ContactPage = () => (
  <div>
    <h1>Get in Touch</h1>
    <div>
      <ContactItem link="mailto:malcolm.keeweesiong@gmail.com">
        <Icon>email</Icon>
      </ContactItem>
      <ContactItem link="https://twitter.com/Malcolm_Kee">
        <Icon type="image" src={twitterIcon} alt="twitter" />
      </ContactItem>
      <ContactItem link="https://www.meetup.com/Kuala-Lumpur-React-JS-Meetup/">
        <Icon type="image" src={meetupIcon} alt="meetup" />
      </ContactItem>
      <ContactItem link="https://github.com/malcolm-kee">
        <Icon>code</Icon>
      </ContactItem>
    </div>
    <Button color="primary" component={Link} to="/" raised>
      <Icon>home</Icon> Home
    </Button>
  </div>
);

export default ContactPage;
