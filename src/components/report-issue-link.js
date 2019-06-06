import React from 'react';
import { useRepositoryUrl } from '../hooks/use-repository-url';
import { OutLink } from './OutLink';

export const ReportIssueLink = ({ title }) => {
  const repositoryUrl = useRepositoryUrl();
  return (
    <OutLink
      to={encodeURI(
        `${repositoryUrl}/issues/new?labels=bug&template=instruction-issue.md&title=${title}`
      )}
    >
      Report here
    </OutLink>
  );
};
