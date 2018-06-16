import Link from 'gatsby-link';
import React from 'react';
import Helmet from 'react-helmet';
import githubLogo from '../assets/github-logo.png';
import linkedInIcon from '../assets/linkedin-icon.png';
import meetupIcon from '../assets/meetup-icon.svg';
import twitterIcon from '../assets/twitter-icon.png';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { List, ListItem, ListItemIcon, ListItemText } from '../components/List';
import './contact.scss';

const ContactPage = () => (
  <div className="ContactPage">
    <Helmet>
      <title>Contact - Malcolm Kee</title>
    </Helmet>
    <div className="ContactPage--content-container">
      <h1>Get in Touch</h1>
      <div className="ContactPage--panel">
        <List>
          <ListItem
            component="a"
            href="mailto:malcolm.keeweesiong@gmail.com"
            button
          >
            <ListItemIcon>
              <Icon>email</Icon>
            </ListItemIcon>
            <ListItemText
              primaryText="Email"
              tertiaryText="Formal channel"
              hideOverflow
            />
          </ListItem>
          <ListItem
            component="a"
            href="https://www.linkedin.com/in/malcolmkee/"
            button
          >
            <ListItemIcon>
              <Icon type="image" src={linkedInIcon} alt="LinkedIn" />
            </ListItemIcon>
            <ListItemText
              primaryText="LinkedIn"
              tertiaryText="Professional Profile"
            />
          </ListItem>
          <ListItem component="a" href="https://github.com/malcolm-kee" button>
            <ListItemIcon>
              <Icon type="image" src={githubLogo} alt="github" />
            </ListItemIcon>
            <ListItemText
              primaryText="Github"
              tertiaryText="Where I code outside of work"
            />
          </ListItem>
          <ListItem component="a" href="https://twitter.com/Malcolm_Kee" button>
            <ListItemIcon>
              <Icon type="image" src={twitterIcon} alt="twitter" />
            </ListItemIcon>
            <ListItemText
              primaryText="Twitter"
              tertiaryText="My recent activities and thoughts"
            />
          </ListItem>
          <ListItem
            component="a"
            href="https://www.meetup.com/Kuala-Lumpur-React-JS-Meetup/"
            button
          >
            <ListItemIcon>
              <Icon type="image" src={meetupIcon} alt="meetup" />
            </ListItemIcon>
            <ListItemText
              primaryText="Meetup"
              tertiaryText="Kuala Lumpur React JS Meetup"
            />
          </ListItem>
        </List>
      </div>
    </div>
    <div className="Toolbar center">
      <Button color="primary" component={Link} to="/" raised>
        <Icon>home</Icon> Home
      </Button>
    </div>
  </div>
);

export default ContactPage;
