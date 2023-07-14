import * as React from 'react';
import { clsx } from 'clsx';

export const Field = ({
  label,
  onChangeValue,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & {
  label: string;
  onChangeValue: (value: string) => void;
}) => {
  const fallbackId = React.useId();

  const id = props.id || fallbackId;

  return (
    <div>
      <label htmlFor={id} className="block text-sm text-zinc-700">
        {label}
      </label>
      <input
        type="text"
        {...props}
        onChange={(ev) => onChangeValue(ev.target.value)}
        className={clsx('text-lg border border-gray-400 px-3 py-1 rounded', props.className)}
      />
    </div>
  );
};
