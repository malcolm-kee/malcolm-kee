import * as React from 'react';

export const Checkbox = ({
  onChangeValue,
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & {
  onChangeValue: (checked: boolean) => void;
  label: string;
}) => {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" {...props} onChange={(ev) => onChangeValue(ev.target.checked)} />
      {label}
    </label>
  );
};
