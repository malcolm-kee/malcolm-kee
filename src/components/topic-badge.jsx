import React from 'react';
import styles from './topic-badge.module.scss';

export const TopicBadge = ({ id, icon }) => {
  return (
    <span className={styles.container}>
      {icon && icon.publicURL && (
        <span className={styles.icon}>
          <img src={icon.publicURL} className={styles.img} alt="" />
        </span>
      )}
      {id}
    </span>
  );
};
