import React from 'react';
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

export const Comments = ({ comments, articlePath }) => {
  const repositoryUrl = useRepositoryUrl();

  const hasComments = comments.length > 0;

  return (
    <section className="article-comments">
      <header className="article-comments-header">Comments</header>
      {hasComments ? (
        comments.map(({ bodyHTML, id, author, createdAt, url, comments }) => (
          <Comment
            bodyHTML={bodyHTML}
            author={author}
            createdAt={createdAt}
            url={url}
            comments={comments}
            key={id}
          />
        ))
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
