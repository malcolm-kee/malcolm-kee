import { graphql } from 'gatsby';
import * as React from 'react';
import { BlogCard } from '../components/blog-card';
import { RoundedLinkButton } from '../components/Button';
import { Seo } from '../components/Seo';

export default function BlogsWithTag({ data, pageContext, location }) {
  const { tag } = pageContext;
  const { edges: posts, totalCount } = data.allBlogPost;

  return (
    <div className="px-4 md:px-8 py-3">
      <Seo title={`Tag - ${tag}`} pathname={location.pathname} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Blogs tagged with "{tag}"
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
            {totalCount} {totalCount > 1 ? 'posts' : 'post'}
          </p>
        </div>
        <ul className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {posts.map(({ node: blog }) => (
            <BlogCard blog={blog} disabledTag={tag} key={blog.id} />
          ))}
        </ul>
        <div className="py-2 my-4 px-4">
          <RoundedLinkButton to="/tags/">All Tags</RoundedLinkButton>
        </div>
      </div>
    </div>
  );
}

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
          ...BlogCard
        }
      }
    }
  }
`;
