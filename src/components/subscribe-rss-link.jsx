import * as React from 'react';
import { OutLink } from './OutLink';
import { RssIcon } from './rss-icon';
import styles from './subscribe-rss-link.module.css';

const rssLink = (
  <OutLink href="/rss.xml" className={styles.root}>
    <RssIcon className={styles.link} />
  </OutLink>
);

export const SubscribeRssLink = () => rssLink;
