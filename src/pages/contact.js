import { Link } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import githubLogo from '../assets/github-logo.png';
import linkedInIcon from '../assets/linkedin-icon.png';
import meetupIcon from '../assets/meetup-icon.svg';
import twitterIcon from '../assets/twitter-icon.png';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { List, ListItem, ListItemIcon, ListItemText } from '../components/List';
import { OutLink } from '../components/OutLink';
import './contact.scss';

const ContactPage = () => (
  <div className="ContactPage">
    <Helmet>
      <title>Contact - Malcolm Kee</title>
    </Helmet>
    <main className="ContactPage--content-container">
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
            component={OutLink}
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
          <ListItem
            component={OutLink}
            href="https://github.com/malcolm-kee"
            button
          >
            <ListItemIcon>
              <Icon type="image" src={githubLogo} alt="github" />
            </ListItemIcon>
            <ListItemText
              primaryText="Github"
              tertiaryText="Where I code outside of work"
            />
          </ListItem>
          <ListItem
            component={OutLink}
            href="https://twitter.com/Malcolm_Kee"
            button
          >
            <ListItemIcon>
              <Icon type="image" src={twitterIcon} alt="twitter" />
            </ListItemIcon>
            <ListItemText
              primaryText="Twitter"
              tertiaryText="My recent activities and thoughts"
            />
          </ListItem>
          <ListItem
            component={OutLink}
            href="https://www.meetup.com/kl-react/"
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
    </main>
    <nav className="Toolbar center">
      <Button color="primary" component={Link} to="/" raised>
        <Icon>home</Icon> Home
      </Button>
    </nav>
  </div>
);

export default ContactPage;
