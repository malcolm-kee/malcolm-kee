import * as React from 'react';
import { getGithubIssueLink } from '../helper';
import { useRepositoryUrl } from '../hooks/use-repository-url';
import { OutLink } from './OutLink';

export const ReportIssueLink = ({ title }) => {
  const repositoryUrl = useRepositoryUrl();
  return (
    <OutLink
      to={getGithubIssueLink(repositoryUrl, {
        title,
        labels: 'bug',
        template: 'instruction-issue.md',
      })}
      className="text-primary-800 dark:text-primary-400"
    >
      Report here
    </OutLink>
  );
};
