import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { List, ListItem, ListItemText } from '../components/List';
import { MainContent } from '../components/main-content';

function BlogsWithTag({ data, pageContext }) {
  const { tag } = pageContext;
  const { edges: posts, totalCount } = data.allMarkdownRemark;
  const tagTitle = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <MainContent>
      <div>
        <Helmet>
          <title>Tag - {tag}</title>
        </Helmet>
        <h1>{tagTitle}</h1>
        <List>
          {posts.map(({ node: { frontmatter: { path, title, summary } } }) => (
            <ListItem button component={Link} to={path} key={path}>
              <ListItemText
                primaryText={title}
                boldPrimary
                tertiaryText={summary}
              />
            </ListItem>
          ))}
        </List>
        <div className="Toolbar">
          <Link to="/tags" className="link-primary">
            All Tags
          </Link>
        </div>
      </div>
    </MainContent>
  );
}

BlogsWithTag.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired
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
              summary: PropTypes.string.isRequired
            })
          })
        }).isRequired
      )
    })
  })
};

export default BlogsWithTag;

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
            summary
          }
        }
      }
    }
  }
`;
