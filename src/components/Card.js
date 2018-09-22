import React from 'react';
import { getClassName } from '../helper';
import './Card.scss';

export const Card = ({ as: Component = 'div', className, ...props }) => (
  <Component className={getClassName('card', className)} {...props} />
);

export const CardImage = ({ className, src, alt, children, ...props }) => (
  <div className={getClassName('card--image-container', className)} {...props}>
    <img src={src} alt={alt} className="card--image" />
  </div>
);

export const CardContent = ({ className, ...props }) => (
  <div className={getClassName('card--content', className)} {...props} />
);

export const CardActions = ({ className, ...props }) => (
  <div className={getClassName('card--actions', className)} {...props} />
);
