import cx from 'classnames';
import React from 'react';
import { callAll } from '../helper';
import { checkbox, root, text } from './checkbox.module.scss';

export const Checkbox = ({
  name,
  id = name,
  label = name,
  onChange,
  onChangeValue,
  className,
  ...props
}) => {
  return (
    <div className={root}>
      <input
        type="checkbox"
        onChange={callAll(
          onChange,
          onChangeValue && (ev => onChangeValue(ev.target.checked))
        )}
        name={name}
        id={id}
        className={cx(checkbox, className)}
        {...props}
      />
      <label className={text} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
