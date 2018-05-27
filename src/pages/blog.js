import Link from 'gatsby-link';
import React from 'react';
import Helmet from 'react-helmet';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { List, ListItem, ListItemText } from '../components/List';

const BlogPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div>
      <Helmet>
        <title>Blogs - Malcolm Kee</title>
      </Helmet>
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
              tertiaryText={post.excerpt}
              boldPrimary
            />
          </ListItem>
        ))}
      </List>
      <div className="Toolbar">
        <Button color="primary" component={Link} to="/" raised>
          <Icon>home</Icon> Home
        </Button>
        <Button color="primary" component={Link} to="/tags">
          <Icon>local_offer</Icon> all tags
        </Button>
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 150)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;

export default BlogPage;
