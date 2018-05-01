import React from 'react';
import Link from 'gatsby-link';
import { Button } from '../components/Button';

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to Malcolm Kee's personal website.</p>
    <p>This site is currently WIP.</p>
    <div>
      <Button color="primary" component={Link} to="/contact/" raised>
        Get in touch
      </Button>
    </div>
    <div>
      <Button color="primary" component={Link} to="/blog" raised>
        Read my Blogs
      </Button>
    </div>
  </div>
);

export default IndexPage;
