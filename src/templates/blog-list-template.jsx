import { graphql } from 'gatsby';
import React from 'react';
import { RoundedLinkButton } from '../components/Button';
import { List, ListItem, ListItemText } from '../components/List';
import { MainContent } from '../components/main-content';
import { PageTitleContainer } from '../components/page-title-container';
import { PaginationContainer, PaginationItem } from '../components/pagination';
import { Seo } from '../components/Seo';
import { SubscribeRssLink } from '../components/subscribe-rss-link';
import { getReadtimeText } from '../helper';
import { createEmptyArray } from '../lib/array';

const BlogListTemplate = ({
  data,
  pageContext: { currentPage, numPages },
  location,
}) => {
  const { posts } = data.allBlogPost;

  const isFirstPage = currentPage === 1;

  const prevPage = isFirstPage
    ? null
    : currentPage === 2
    ? `/blog`
    : `/blog/${currentPage - 1}`;
  const nextPage = currentPage === numPages ? null : `/blog/${currentPage + 1}`;

  return (
    <MainContent as="div">
      <Seo
        title={
          isFirstPage
            ? `Blogs - Malcolm Kee`
            : `Blogs - ${currentPage} of ${numPages} - Malcolm Kee`
        }
      />
      <main className="max-w-lg mx-auto">
        <PageTitleContainer
          title={isFirstPage ? 'Blogs' : `Blogs - Page ${currentPage}`}
        />
        <List>
          {posts.map(({ node: post }) => (
            <ListItem link={post.slug} className="blog-list-item" key={post.id}>
              <ListItemText
                primaryText={post.title}
                secondaryText={
                  <>
                    <span>{post.date}</span>
                    {post.timeToRead && (
                      <span className="italic">
                        {' '}
                        ({getReadtimeText(post.timeToRead)} read)
                      </span>
                    )}
                  </>
                }
                tertiaryText={post.summary}
                boldPrimary
              />
            </ListItem>
          ))}
        </List>
      </main>
      {numPages > 1 && (
        <PaginationContainer prevLink={prevPage} nextLink={nextPage}>
          {createEmptyArray(numPages).map((_, index) => {
            const path = index === 0 ? `/blog` : `/blog/${index + 1}`;
            const isCurrent = location.pathname === path;
            return (
              <PaginationItem
                to={path}
                aria-current={isCurrent ? true : undefined}
                key={index}
              >
                {index + 1}
              </PaginationItem>
            );
          })}
        </PaginationContainer>
      )}
      <nav className="flex justify-between items-center p-2 my-4">
        <span>
          <RoundedLinkButton to="/" className="mr-2">
            Home
          </RoundedLinkButton>
          <RoundedLinkButton to="/tags">All tags</RoundedLinkButton>
        </span>
        <SubscribeRssLink />
      </nav>
    </MainContent>
  );
};

export const pageQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allBlogPost(
      filter: { published: { eq: true } }
      sort: { order: DESC, fields: [date] }
      skip: $skip
      limit: $limit
    ) {
      posts: edges {
        node {
          id
          title
          date(formatString: "MMM DD, YYYY")
          summary
          timeToRead
          slug
        }
      }
    }
  }
`;

export default BlogListTemplate;
