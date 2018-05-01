import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { List, ListItem, ListItemText } from '../components/List';

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
              secondaryText={post.excerpt}
              tertiaryText={post.frontmatter.date}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
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
