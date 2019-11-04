import { graphql } from 'gatsby';
import React from 'react';
import { useQuery } from 'urql';
import { getGithubIssueLink } from '../helper';
import { useRepositoryUrl } from '../hooks/use-repository-url';
import { Button } from './Button';
import styles from './comments.module.scss';
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
        setComments(oldComments => oldComments.concat(newComments));
      }
    }
  }, [fetching, data, commentsData]);

  const hasComments = commentsData.length > 0;

  return (
    <section className={styles.root}>
      <header className={styles.header}>Comments</header>
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
        <div className={styles.info}>
          <p>There is no comment on this post yet.</p>
        </div>
      )}
      <div className={styles.actions}>
        <Button
          color="secondary"
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

const Comment = ({ bodyHTML, author, createdAt, url, comments, level = 0 }) => {
  const childNode = (
    <>
      <div
        className={styles.comment}
        style={level ? { marginLeft: level * 25 } : undefined}
      >
        {url && (
          <span className={styles.link}>
            <OutLink href={url}>Reply</OutLink>
          </span>
        )}
        <div className={styles.avatar}>
          <img src={author.avatarUrl} alt={author.name} />
        </div>
        <div>
          <div className={styles.author}>
            <OutLink href={author.url}>
              <span>{author.name}</span>
            </OutLink>{' '}
            on {parseDate(createdAt)}
          </div>
          <div
            className={styles.content}
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

  return level === 0 ? (
    <div className={styles.thread}>{childNode}</div>
  ) : (
    childNode
  );
};

export const query = graphql`
  fragment Comment on GitHub_Issue {
    id
    url
    bodyHTML
    createdAt
    author {
      ... on GitHub_User {
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
          ... on GitHub_User {
            name
          }
          avatarUrl
          url
        }
      }
    }
  }
`;
