import cx from 'classnames';
import * as React from 'react';
import { callAll } from '../lib/fp';
import styles from './field.module.scss';

export const Field = ({
  className,
  label,
  InputComponent = 'input',
  name,
  id = name,
  onChangeValue,
  onChange,
  labelClassName,
  ...inputProps
}) => {
  const [focused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef(null);
  const value =
    inputProps.value || (inputRef.current && inputRef.current.value);

  return (
    <div className={cx('pt-5 mt-2 mb-4 relative w-full')}>
      <label
        htmlFor={id}
        className={cx(
          'label animated select-none absolute pb-2 left-2',
          styles.label,
          value || focused ? 'top-0 text-xs' : 'top-6',
          focused ? 'text-primary-700 dark:text-primary-400' : 'text-gray-700',
          labelClassName
        )}
      >
        {label}
      </label>
      <InputComponent
        className={cx(
          'form-control text-base block m-0 w-full border border-transparent rounded-lg px-3 py-1 shadow-inner bg-gray-200 text-gray-900 focus:outline-none focus:shadow-outline-gray',
          className
        )}
        name={name}
        id={id}
        {...inputProps}
        onChange={callAll(
          onChange,
          onChangeValue && ((ev) => onChangeValue(ev.target.value))
        )}
        onFocus={callAll(inputProps.onFocus, () => setIsFocused(true))}
        onBlur={callAll(inputProps.onBlur, () => setIsFocused(false))}
        ref={inputRef}
      />
    </div>
  );
};
