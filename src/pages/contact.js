import { Link } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import { Button } from '../components/Button';
import { List, ListItem, ListItemText } from '../components/List';
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
        Home
      </Button>
    </nav>
  </div>
);

export default ContactPage;
