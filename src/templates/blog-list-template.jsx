import { graphql, Link } from 'gatsby';
import React from 'react';
import { List, ListItem, ListItemText } from '../components/List';
import { MainContent } from '../components/main-content';
import { PageTitleContainer } from '../components/page-title-container';
import { PaginationContainer, PaginationItem } from '../components/pagination';
import { Seo } from '../components/Seo';
import { SubscribeRssLink } from '../components/subscribe-rss-link';
import { getReadtimeText } from '../helper';
import { createEmptyArray } from '../lib/array';

const BlogListTemplate = ({ data, pageContext: { currentPage, numPages } }) => {
  const { posts } = data.allMdx;

  const title =
    currentPage === 1
      ? `Blogs - Malcolm Kee`
      : `Blogs - ${currentPage} of ${numPages} - Malcolm Kee`;
  const prevPage =
    currentPage === 1
      ? null
      : currentPage === 2
      ? `/blog`
      : `/blog/${currentPage - 1}`;
  const nextPage = currentPage === numPages ? null : `/blog/${currentPage + 1}`;

  return (
    <MainContent as="div">
      <Seo title={title} />
      <main>
        <PageTitleContainer title="Blogs" />
        <List>
          {posts.map(({ node: post }) => (
            <ListItem
              button
              component={Link}
              to={post.blogUrl}
              key={post.blogUrl}
              className="blog-list-item"
              noGutter
            >
              <ListItemText
                primaryText={post.frontmatter.title}
                secondaryText={
                  <>
                    <span>{post.frontmatter.date}</span>
                    {post.timeToRead && (
                      <span className="italic">
                        {' '}
                        ({getReadtimeText(post.timeToRead)} read)
                      </span>
                    )}
                  </>
                }
                tertiaryText={post.frontmatter.summary}
                boldPrimary
              />
            </ListItem>
          ))}
        </List>
      </main>
      <PaginationContainer prevLink={prevPage} nextLink={nextPage}>
        {createEmptyArray(numPages).map((_, index) => (
          <PaginationItem
            to={index === 0 ? `/blog` : `/blog/${index + 1}`}
            key={index}
          >
            {index + 1}
          </PaginationItem>
        ))}
      </PaginationContainer>
      <nav className="Toolbar space-between">
        <span>
          <Link to="/" className="link-primary">
            Home
          </Link>
          <Link to="/tags" className="link-primary">
            All tags
          </Link>
        </span>
        <SubscribeRssLink />
      </nav>
    </MainContent>
  );
};

export const pageQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      filter: {
        workshop: { id: { eq: null } }
        frontmatter: { published: { eq: true } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
      skip: $skip
      limit: $limit
    ) {
      posts: edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
            summary
          }
          timeToRead
          blogUrl
        }
      }
    }
  }
`;

export default BlogListTemplate;
