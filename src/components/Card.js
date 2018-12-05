import React from 'react';
import { joinClassName } from 'join-string';
import './Card.scss';

export const Card = ({ as: Component = 'div', className, ...props }) => (
  <Component className={joinClassName('card', className)} {...props} />
);

export const CardImage = ({ className, src, alt, children, ...props }) => (
  <div className={joinClassName('card--image-container', className)} {...props}>
    <img src={src} alt={alt} className="card--image" />
  </div>
);

export const CardContent = ({ className, ...props }) => (
  <div className={joinClassName('card--content', className)} {...props} />
);

export const CardActions = ({ className, ...props }) => (
  <div className={joinClassName('card--actions', className)} {...props} />
);
