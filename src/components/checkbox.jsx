import cx from 'classnames';
import React from 'react';
import { callAll } from '../lib/fp';
import styles from './checkbox.module.scss';

export const Checkbox = ({
  name,
  id = name,
  label = name,
  onChange,
  onChangeValue,
  className,
  wrapperClassName,
  ...props
}) => {
  return (
    <div className={cx('py-3', wrapperClassName)}>
      <input
        type="checkbox"
        onChange={callAll(
          onChange,
          onChangeValue && (ev => onChangeValue(ev.target.checked))
        )}
        name={name}
        id={id}
        className={cx(styles.checkbox, className)}
        {...props}
      />
      <label className="mr-2" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
