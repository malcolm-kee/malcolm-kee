import { graphql } from 'gatsby';
import * as React from 'react';
import { BlogCard } from '../components/blog-card';
import { RoundedLinkButton } from '../components/Button';
import { PaginationContainer, PaginationItem } from '../components/pagination';
import { Seo } from '../components/Seo';
import { SubscribeRssLink } from '../components/subscribe-rss-link';
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
    ? `/blog/`
    : `/blog/${currentPage - 1}/`;
  const nextPage =
    currentPage === numPages ? null : `/blog/${currentPage + 1}/`;

  return (
    <div className="px-4 md:px-8 py-3">
      <Seo
        title={
          isFirstPage
            ? `Blogs - Malcolm Kee`
            : `Blogs - ${currentPage} of ${numPages} - Malcolm Kee`
        }
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Blogs
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
            My thoughts on technologies, books, or just any random stuffs.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {posts.map(({ node: blog }) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
        </ul>
        {numPages > 1 && (
          <PaginationContainer prevLink={prevPage} nextLink={nextPage}>
            {createEmptyArray(numPages).map((_, index) => {
              const path = index === 0 ? `/blog/` : `/blog/${index + 1}/`;
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
            <RoundedLinkButton to="/tags/">All tags</RoundedLinkButton>
          </span>
          <SubscribeRssLink />
        </nav>
      </div>
    </div>
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
          ...BlogCard
        }
      }
    }
  }
`;

export default BlogListTemplate;
