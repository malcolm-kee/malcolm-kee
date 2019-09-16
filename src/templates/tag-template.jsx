import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { List, ListItem, ListItemText } from '../components/List';
import { MainContent } from '../components/main-content';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';
import styles from './tag-template.module.scss';

function BlogsWithTag({ data, pageContext, location }) {
  const { tag } = pageContext;
  const { edges: posts, totalCount } = data.allMdx;

  return (
    <>
      <Seo title={`Tag - ${tag}`} pathname={location.pathname} />
      <MainContent>
        <PageTitleContainer title={tag} />
        <p className={styles.count}>
          {totalCount} {totalCount > 1 ? 'posts' : 'post'}
        </p>
        <List>
          {posts.map(
            ({
              node: {
                blogUrl,
                frontmatter: { title, summary },
              },
            }) => (
              <ListItem button component={Link} to={blogUrl} key={blogUrl}>
                <ListItemText
                  primaryText={title}
                  boldPrimary
                  tertiaryText={summary}
                />
              </ListItem>
            )
          )}
        </List>
        <div className="Toolbar">
          <Link to="/tags" className="link-primary">
            All Tags
          </Link>
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
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            blogUrl: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              summary: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export default BlogsWithTag;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          blogUrl
          frontmatter {
            title
            summary
          }
        }
      }
    }
  }
`;
