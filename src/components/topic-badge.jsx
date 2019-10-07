import React from 'react';
import styles from './topic-badge.module.scss';

export const TopicBadge = ({ id, icon }) => {
  return (
    <span className={styles.container}>
      {icon && icon.publicURL && (
        <img src={icon.publicURL} className={styles.icon} alt="" />
      )}
      {id}
    </span>
  );
};
