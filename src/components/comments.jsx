import React from 'react';
import { useQuery } from 'urql';
import { getGithubIssueLink } from '../helper';
import { useRepositoryUrl } from '../hooks/use-repository-url';
import { Button } from './Button';
import './comments.scss';
import { OutLink } from './OutLink';

const parseDate = dateString =>
  new Date(dateString).toLocaleString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

const getComments = `
  query GetComments($searchTerm: String!){
    search(query: $searchTerm, type: ISSUE, first: 10) {
      nodes {
        ... on Issue {
          id
          url
          bodyHTML
          createdAt
          author {
            ... on User {
              name
            }
            avatarUrl
            url
          }
          comments(first: 100) {
            nodes {
              id
              bodyHTML
              createdAt
              author {
                ... on User {
                  name
                }
                avatarUrl
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const Comments = ({ comments, articlePath, searchTerm }) => {
  const repositoryUrl = useRepositoryUrl();
  const [commentsData, setComments] = React.useState(comments);

  const [{ fetching, data }] = useQuery({
    query: getComments,
    variables: {
      searchTerm,
    },
    pause: typeof window === 'undefined' || !searchTerm, // do not make query during SSR because fetch is not available
  });

  React.useEffect(() => {
    if (!fetching && data) {
      const newComments = data.search.nodes.filter(
        node => !commentsData.some(comment => comment.id === node.id)
      );

      if (newComments.length > 0) {
        setComments(oldComments => newComments.concat(oldComments));
      }
    }
  }, [fetching, data]);

  const hasComments = commentsData.length > 0;

  return (
    <section className="article-comments">
      <header className="article-comments-header">Comments</header>
      {hasComments ? (
        commentsData.map(
          ({ bodyHTML, id, author, createdAt, url, comments }) => (
            <Comment
              bodyHTML={bodyHTML}
              author={author}
              createdAt={createdAt}
              url={url}
              comments={comments}
              key={id}
            />
          )
        )
      ) : (
        <div className="article-comments-info">
          <p>There is no comment on this post yet.</p>
        </div>
      )}
      <div className="article-comments-actions">
        <Button
          color="primary"
          raised
          component={OutLink}
          href={getGithubIssueLink(repositoryUrl, {
            title: articlePath,
            labels: 'comment',
            template: 'blog-comment.md',
          })}
        >
          Add Comment
        </Button>
      </div>
    </section>
  );
};

const Comment = ({ bodyHTML, author, createdAt, url, comments, level = 0 }) => (
  <>
    <div className="article-comment" style={{ marginLeft: level * 25 }}>
      {url && (
        <span className="article-comment-link">
          <OutLink href={url}>Reply</OutLink>
        </span>
      )}
      <div className="article-comment-avatar">
        <img src={author.avatarUrl} alt={author.login} />
      </div>
      <div>
        <div className="article-comment-author">
          <OutLink href={author.url}>
            <span>{author.name}</span>
          </OutLink>{' '}
          on {parseDate(createdAt)}
        </div>
        <div
          className="article-comment-content"
          dangerouslySetInnerHTML={{ __html: bodyHTML }}
        />
      </div>
    </div>
    {comments &&
      comments.nodes.map(comment => (
        <Comment {...comment} level={level + 1} key={comment.id} />
      ))}
  </>
);
