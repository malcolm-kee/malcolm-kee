import React from 'react';
import { OutLink } from './OutLink';
import { RssIcon } from './rss-icon';
import './subscribe-rss-link.scss';

const rssLink = (
  <OutLink href="/rss.xml">
    <RssIcon className="subscribe-rss-link" />
  </OutLink>
);

export const SubscribeRssLink = () => rssLink;
