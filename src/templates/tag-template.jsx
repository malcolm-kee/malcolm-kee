import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import * as React from 'react';
import { RoundedLinkButton } from '../components/Button';
import { List, ListItem, ListItemText } from '../components/List';
import { MainContent } from '../components/main-content';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';

function BlogsWithTag({ data, pageContext, location }) {
  const { tag } = pageContext;
  const { edges: posts, totalCount } = data.allBlogPost;

  return (
    <>
      <Seo title={`Tag - ${tag}`} pathname={location.pathname} />
      <MainContent>
        <PageTitleContainer title={tag} />
        <p className="pb-4 px-4">
          {totalCount} {totalCount > 1 ? 'posts' : 'post'}
        </p>
        <List>
          {posts.map(({ node: { slug, title, summary, id } }) => (
            <ListItem link={slug} key={id}>
              <ListItemText
                primaryText={title}
                boldPrimary
                tertiaryText={summary}
              />
            </ListItem>
          ))}
        </List>
        <div className="py-2 my-4 px-4">
          <RoundedLinkButton to="/tags">All Tags</RoundedLinkButton>
        </div>
      </MainContent>
    </>
  );
}

BlogsWithTag.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allBlogPost: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            summary: PropTypes.string.isRequired,
          }),
        }).isRequired
      ),
    }),
  }),
};

export default BlogsWithTag;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allBlogPost(
      limit: 2000
      filter: { tags: { in: [$tag] }, published: { eq: true } }
      sort: { order: DESC, fields: [date] }
    ) {
      totalCount
      edges {
        node {
          id
          slug
          title
          summary
        }
      }
    }
  }
`;
