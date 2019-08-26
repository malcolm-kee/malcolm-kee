import React from 'react';
import cx from 'classnames';
import { callAll } from '../helper';
import { root, checkbox, text } from './checkbox.module.scss';
import { Toggle } from './toggle';

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
