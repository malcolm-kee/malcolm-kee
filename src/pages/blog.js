import { graphql, Link } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import { OutLink } from '../components/OutLink';
import { List, ListItem, ListItemText } from '../components/List';
import { getReadtimeText } from '../helper';
import { ThemeToggle } from '../components/theme-toggle';
import './blog.scss';

const BlogPage = ({ data }) => {
  const { posts } = data.allMarkdownRemark;

  return (
    <div className="main-content">
      <Helmet>
        <title>Blogs - Malcolm Kee</title>
      </Helmet>
      <main>
        <div className="blog-list-title-container">
          <h1>Recent Blogs</h1>
          <ThemeToggle />
        </div>
        <List>
          {posts.map(({ node: post }) => (
            <ListItem
              button
              component={Link}
              to={post.frontmatter.path}
              key={post.frontmatter.path}
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
      <nav className="Toolbar space-between">
        <span>
          <Link to="/" className="link-primary">
            Home
          </Link>
          <Link to="/tags" className="link-primary">
            All tags
          </Link>
        </span>
        <OutLink href="/rss.xml" className="link-primary">
          RSS
        </OutLink>
      </nav>
    </div>
  );
};

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      posts: edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
            path
            summary
          }
          timeToRead
        }
      }
    }
  }
`;

export default BlogPage;
