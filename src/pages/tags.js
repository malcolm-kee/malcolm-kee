import React from 'react';
import PropTypes from 'prop-types';

// Utilities
import kebabCase from 'lodash/kebabCase';

// Components
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import { List, ListItemText, ListItem } from '../components/List';

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
  <div>
    <Helmet title="Tags" />
    <div>
      <h1>Tags</h1>
      <List>
        {group.map(tag => (
          <ListItem
            component={Link}
            to={`/tags/${kebabCase(tag.fieldValue)}/`}
            key={tag.fieldValue}
          >
            <ListItemText
              primaryText={tag.fieldValue}
              secondaryText={`${tag.totalCount} post(s)`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  </div>
);

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
};

export default TagsPage;

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
