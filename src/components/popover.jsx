import React from 'react';
import PopoverLibrary from 'react-tiny-popover';
import './popover.scss';

export const Popover = PopoverLibrary;

export const PopoverContent = ({ children }) => (
  <div className="popover-content">{children}</div>
);
