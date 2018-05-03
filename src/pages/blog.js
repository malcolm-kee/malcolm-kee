import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { List, ListItem, ListItemText } from '../components/List';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';

const BlogPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div>
      <Helmet title="Blogs - Malcolm Kee" />
      <h1>Recent Blogs</h1>
      <List>
        {posts.map(({ node: post }) => (
          <ListItem
            button
            component={Link}
            to={post.frontmatter.path}
            key={post.frontmatter.path}
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
      <Button color="primary" component={Link} to="/tags">
        <Icon>local_offer</Icon> See all tags
      </Button>
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
