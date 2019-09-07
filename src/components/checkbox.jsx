import cx from 'classnames';
import React from 'react';
import { callAll } from '../helper';
import styles from './checkbox.module.scss';

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
    <div className={styles.root}>
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
      <label className={styles.text} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
