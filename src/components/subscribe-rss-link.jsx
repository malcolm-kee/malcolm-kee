import React from 'react';
import { OutLink } from './OutLink';
import { RssIcon } from './rss-icon';
import { link } from './subscribe-rss-link.module.scss';

const rssLink = (
  <OutLink href="/rss.xml">
    <RssIcon className={link} />
  </OutLink>
);

export const SubscribeRssLink = () => rssLink;
