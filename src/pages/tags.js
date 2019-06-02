import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { List, ListItem, ListItemText } from '../components/List';
import { PageTitleContainer } from '../components/page-title-container';
import { MainContent } from '../components/main-content';
import './tags.scss';

const getItemClassName = count =>
  count >= 4 ? 'tag-count-4' : `tag-count-${count}`;

const randomSort = () => (Math.random() > 0.5 ? -1 : 1);

const TagsPage = ({
  data: {
    allMarkdownRemark: { group }
  }
}) => (
  <MainContent className="TagPage">
    <Helmet>
      <title>Tags</title>
    </Helmet>
    <PageTitleContainer title="Tags" />
    <div className="TagPage--panel tag-list">
      <List>
        {[]
          .concat(group)
          .sort(randomSort)
          .map(tag => (
            <ListItem
              component={Link}
              to={`/tags/${kebabCase(tag.fieldValue)}/`}
              key={tag.fieldValue}
              className={getItemClassName(tag.totalCount)}
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
        <Link to="/" className="link-primary">
          Home
        </Link>
        <Link to="/blog" className="link-primary">
          Blogs
        </Link>
      </div>
    </div>
  </MainContent>
);

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired
        }).isRequired
      )
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      })
    })
  })
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
