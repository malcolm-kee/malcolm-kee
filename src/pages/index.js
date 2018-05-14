import Link from 'gatsby-link';
import React from 'react';
import { Divider } from '../components/Divider';
import { Icon } from '../components/Icon';
import { List, ListItem, ListItemIcon, ListItemText } from '../components/List';
import { Typography } from '../components/Typography';
import './index.scss';

const IndexPage = () => (
  <div className="IndexPage">
    <div className="IndexPage--panel">
      <h1>Hi</h1>
      <section className="StandardSpacing">
        <Typography>
          I'm Malcolm Kee, a web developer in Kuala Lumpur, Malaysia.
        </Typography>
        <Typography>I code, I read, I teach.</Typography>
      </section>
    </div>
    <div className="IndexPage--panel">
      <List component="nav">
        <Divider />
        <ListItem button component={Link} to="/contact/">
          <ListItemIcon>
            <Icon>account_circle</Icon>
          </ListItemIcon>
          <ListItemText primaryText="Get In Touch" />
        </ListItem>
        <ListItem button component={Link} to="/blog">
          <ListItemIcon>
            <Icon>description</Icon>
          </ListItemIcon>
          <ListItemText primaryText="Read Blogs" />
        </ListItem>
      </List>
    </div>
  </div>
);

export default IndexPage;
