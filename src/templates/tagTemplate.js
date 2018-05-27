import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { List, ListItem, ListItemText } from '../components/List';

function Tags({ data, pathContext }) {
  console.log(data, pathContext);
  const { tag } = pathContext;
  const { edges: posts, totalCount } = data.allMarkdownRemark;
  const tagTitle = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <div>
      <Helmet>
        <title>Tag - {tag}</title>
      </Helmet>
      <h1>{tagTitle}</h1>
      <List>
        {posts.map(({ node: { frontmatter: { path, title } } }) => (
          <ListItem button component={Link} to={path} key={path}>
            <ListItemText primaryText={title} boldPrimary />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

Tags.propTypes = {
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export default Tags;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;
