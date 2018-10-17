import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { List, ListItem, ListItemText } from '../components/List';
import './tags.scss';

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
  <div className="TagPage">
    <Helmet>
      <title>Tags</title>
    </Helmet>
    <div className="TagPage--panel">
      <h1>Tags</h1>
    </div>
    <div className="TagPage--panel tag-list">
      <List>
        {[]
          .concat(group)
          .sort((a, b) => b.totalCount - a.totalCount)
          .map(tag => (
            <ListItem
              component={Link}
              to={`/tags/${kebabCase(tag.fieldValue)}/`}
              key={tag.fieldValue}
              button
            >
              <ListItemText
                primaryText={tag.fieldValue}
                tertiaryText={`${tag.totalCount} ${
                  tag.totalCount > 1 ? 'posts' : 'post'
                }`}
              />
            </ListItem>
          ))}
      </List>
      <div className="Toolbar">
        <Button color="primary" component={Link} to="/" raised>
          <Icon>home</Icon> Home
        </Button>
        <Button color="primary" component={Link} to="/blog">
          <Icon>description</Icon> Blogs
        </Button>
      </div>
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
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      limit: 2000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
