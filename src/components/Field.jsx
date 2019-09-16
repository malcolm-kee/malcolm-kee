import cx from 'classnames';
import React from 'react';
import { callAll } from '../lib/fp';
import './Field.scss';

export const Field = ({
  className,
  label,
  InputComponent = 'input',
  name,
  id = name,
  onChangeValue,
  onChange,
  ...inputProps
}) => {
  const [focused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef(null);

  return (
    <div
      className={cx(
        'field',
        focused && 'field--focused',
        (inputProps.value || (inputRef.current && inputRef.current.value)) &&
          'field--filled'
      )}
    >
      <label htmlFor={id} className="label">
        {label}
      </label>
      <InputComponent
        className={cx('form-control', className)}
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
      <span />
    </div>
  );
};
