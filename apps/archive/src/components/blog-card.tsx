import * as React from 'react';
import { Link, graphql } from 'gatsby';

export type BlogCardProps = {
  blog: {
    slug: string;
    title: string;
    summary: string;
    tags?: string[];
    date: string;
  };
  disabledTag?: string;
};

export const BlogCard = ({ blog, disabledTag }: BlogCardProps) => {
  return (
    <li className="rounded-lg shadow-lg overflow-hidden" key={blog.slug}>
      <div className="bg-white p-6 h-full flex flex-col">
        <p className="text-sm leading-5 font-medium text-primary-600 space-x-1">
          {blog.tags &&
            blog.tags.map((tag) =>
              tag === disabledTag ? (
                <span key={tag}>{tag}</span>
              ) : (
                <Link to={`/tags/${tag}`} className="hover:underline" key={tag}>
                  {tag}
                </Link>
              )
            )}
        </p>
        <Link to={blog.slug} className="flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
              {blog.title}
            </h3>
            <p className="mt-3 text-base leading-6 text-gray-500">
              {blog.summary}
            </p>
          </div>
          <div className="mt-6 text-sm leading-5 text-gray-500">
            {blog.date && <time>{blog.date}</time>}
          </div>
        </Link>
      </div>
    </li>
  );
};

export const query = graphql`
  fragment BlogCard on BlogPost {
    title
    date(formatString: "MMM DD, YYYY")
    summary
    timeToRead
    slug
    tags
  }
`;
