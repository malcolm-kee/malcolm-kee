import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

const BlogPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div>
      <Helmet title="Blogs - Malcolm Kee" />
      <h1>Recent Blogs</h1>
      <div>
        {posts.map(({ node: post }) => (
          <div>
            <h1>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </h1>
            <h2>{post.frontmatter.date}</h2>
            <p>{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;

export default BlogPage;
