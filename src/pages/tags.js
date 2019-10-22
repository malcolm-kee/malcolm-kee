import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { List, ListItem, ListItemText } from '../components/List';
import { MainContent } from '../components/main-content';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';
import './tags.scss';

const getItemClassName = count =>
  count >= 4 ? 'tag-count-4' : `tag-count-${count}`;

const randomSort = () => (Math.random() > 0.5 ? -1 : 1);

const TagsPage = ({
  data: {
    allBlogPost: { group },
  },
}) => (
  <MainContent className="TagPage">
    <Seo title="Tags" />
    <PageTitleContainer title="Tags" />
    <div className="TagPage--panel tag-list">
      <List>
        {[]
          .concat(group)
          .sort(randomSort)
          .map(tag => (
            <ListItem
              link={`/tags/${tag.fieldValue}`}
              className={getItemClassName(tag.totalCount)}
              key={tag.fieldValue}
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
    allBlogPost: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
  }),
};

export default TagsPage;

export const query = graphql`
  query TagsQuery {
    allBlogPost(filter: { published: { eq: true } }, limit: 2000) {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
