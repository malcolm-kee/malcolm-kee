import React from 'react';
import Link from 'gatsby-link';
import { Button } from '../components/Button';
import { Divider } from '../components/Divider';
import { Icon } from '../components/Icon';
import { List, ListItem, ListItemText, ListItemIcon } from '../components/List';
import { Typography } from '../components/Typography';

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <section className="StandardSpacing">
      <Typography>Welcome to Malcolm Kee's personal website.</Typography>
      <Typography>This site is currently WIP.</Typography>
    </section>
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
);

export default IndexPage;
