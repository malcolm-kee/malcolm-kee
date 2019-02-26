import React from 'react';
import { joinClassName } from 'join-string';
import { callAll } from '../helper';
import './Field.scss';

export const Field = ({
  className,
  label,
  InputComponent = 'input',
  ...inputProps
}) => {
  const [focused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef(null);

  return (
    <div
      className={joinClassName(
        'field',
        focused && 'field--focused',
        (inputProps.value || (inputRef.current && inputRef.current.value)) &&
          'field--filled'
      )}
    >
      <label htmlFor={inputProps.id} className="label">
        {label}
      </label>
      <InputComponent
        className={joinClassName('form-control', className)}
        {...inputProps}
        onFocus={callAll(inputProps.onFocus, () => setIsFocused(true))}
        onBlur={callAll(inputProps.onBlur, () => setIsFocused(false))}
        ref={inputRef}
      />
    </div>
  );
};
