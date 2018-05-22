import Link from 'gatsby-link';
import React from 'react';
import { Divider } from '../components/Divider';
import { Icon } from '../components/Icon';
import { List, ListItem, ListItemIcon, ListItemText } from '../components/List';
import { Typography } from '../components/Typography';
import malcolmPhoto from '../assets/malcolm.jpg';
import './index.scss';

const IndexPage = () => (
  <div className="IndexPage">
    <div className="IndexPage--panel">
      <div className="IndexPage--greeting">
        <div className="IndexPage--hi">
          <h1>Hi</h1>
        </div>
        <div>
          <div className="IndexPage--photo-frame">
            <div className="IndexPage--inner-photo-frame">
              <div className="IndexPage--photo-container">
                <img src={malcolmPhoto} alt="Malcolm" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="StandardSpacing">
        <Typography className="IndexPage--text" component="span">
          I'm Malcolm Kee, a web developer in Kuala Lumpur, Malaysia.
        </Typography>
        <br />
        <Typography className="IndexPage--text" component="span">
          I code, I read, I teach.
        </Typography>
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
