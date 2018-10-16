import Link from 'gatsby-link';
import React from 'react';
import { Icon } from '../components/Icon';
import { List, ListItem, ListItemIcon, ListItemText } from '../components/List';
import { Typography } from '../components/Typography';
import malcolmImg from '../assets/malcolm.jpg';
import './index.scss';

const IndexPage = () => (
  <div className="IndexPage">
    <div className="IndexPage--panel">
      <section className="StandardSpacing">
        <img
          src={malcolmImg}
          alt="Malcolm"
          className="IndexPage--profile-photo"
        />
        <h1>Hi</h1>
        <Typography className="IndexPage--text" component="p">
          I'm Malcolm Kee, a frontend engineer in Kuala Lumpur, Malaysia.
        </Typography>
        <Typography className="IndexPage--text" component="p">
          Previously a Business Analyst, I switch my career path as a software
          engineer as I prefer to create things with my own hand.
        </Typography>
        <Typography className="IndexPage--text" component="p">
          My work philosophy:
        </Typography>
        <blockquote>
          <Typography component="p">
            Be so good they can't ignore you.
          </Typography>
          <footer>
            <cite>Steve Martin</cite>
          </footer>
        </blockquote>
      </section>
    </div>
    <div className="IndexPage--panel">
      <List component="nav">
        <ListItem button component={Link} to="/projects">
          <ListItemIcon>
            <Icon>assignment_turned_in</Icon>
          </ListItemIcon>
          <ListItemText primaryText="Projects" />
        </ListItem>
        <ListItem button component={Link} to="/blog">
          <ListItemIcon>
            <Icon>notes</Icon>
          </ListItemIcon>
          <ListItemText primaryText="Blogs" />
        </ListItem>
      </List>
    </div>
  </div>
);

export default IndexPage;
