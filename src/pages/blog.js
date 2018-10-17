import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { List, ListItem, ListItemText } from '../components/List';

const BlogPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div className="main-content">
      <Helmet>
        <title>Blogs - Malcolm Kee</title>
      </Helmet>
      <main>
        <h1>Recent Blogs</h1>
        <List>
          {posts.map(({ node: post }) => (
            <ListItem
              button
              component={Link}
              to={post.frontmatter.path}
              key={post.frontmatter.path}
              noGutter
            >
              <ListItemText
                primaryText={post.frontmatter.title}
                secondaryText={post.frontmatter.date}
                tertiaryText={post.frontmatter.summary}
                boldPrimary
              />
            </ListItem>
          ))}
        </List>
      </main>
      <nav className="Toolbar">
        <Button color="primary" component={Link} to="/" raised>
          <Icon>home</Icon> Home
        </Button>
        <Button color="primary" component={Link} to="/tags">
          <Icon>local_offer</Icon> all tags
        </Button>
      </nav>
    </div>
  );
};

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            summary
          }
        }
      }
    }
  }
`;

export default BlogPage;
