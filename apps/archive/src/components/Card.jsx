import cx from 'classnames';
import * as React from 'react';
import './Card.scss';
import styles from './card.module.scss';

export const Card = ({
  as: Component = 'div',
  selectable,
  onSelect,
  className,
  ...props
}) => (
  <Component
    className={cx('card', selectable && styles.selectable, className)}
    tabIndex={selectable ? 0 : undefined}
    onClick={selectable ? onSelect : undefined}
    onKeyPress={(ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        onSelect();
      }
    }}
    {...props}
  />
);

export const CardImage = ({ className, src, alt, children, ...props }) => (
  <div className={cx('card--image-container', className)} {...props}>
    <img src={src} alt={alt} className="card--image" />
  </div>
);

export const CardContent = ({ className, ...props }) => (
  <div className={cx('card-content', className)} {...props} />
);

export const CardActions = ({ className, ...props }) => (
  <div className={cx('card-actions', className)} {...props} />
);
