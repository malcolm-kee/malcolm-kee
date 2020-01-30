import cx from 'classnames';
import React from 'react';
import { callAll } from '../lib/fp';

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
          'label animated select-none absolute pb-2 transition-normal-in-out-quad left-2',
          value || focused ? 'top-0 text-xs' : 'top-6',
          focused ? 'text-primary-700 dark:text-primary-400' : 'text-gray-700',
          labelClassName
        )}
      >
        {label}
      </label>
      <InputComponent
        className={cx(
          'form-control text-base block m-0 w-full border border-transparent rounded-lg px-3 py-1 shadow-inner bg-gray-200 text-gray-900',
          className
        )}
        name={name}
        id={id}
        {...inputProps}
        onChange={callAll(
          onChange,
          onChangeValue && (ev => onChangeValue(ev.target.value))
        )}
        onFocus={callAll(inputProps.onFocus, () => setIsFocused(true))}
        onBlur={callAll(inputProps.onBlur, () => setIsFocused(false))}
        ref={inputRef}
      />
    </div>
  );
};
