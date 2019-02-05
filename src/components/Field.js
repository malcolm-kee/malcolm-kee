import React from 'react';
import { joinClassName } from 'join-string';
import './Field.scss';

export const Field = ({
  className,
  label,
  InputComponent = 'input',
  ...inputProps
}) => (
  <div className="field">
    <label htmlFor={inputProps.id} className="label">
      {label}
    </label>
    <InputComponent
      className={joinClassName('form-control', className)}
      {...inputProps}
    />
  </div>
);
