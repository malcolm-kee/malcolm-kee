import * as React from 'react';

export const Button = (props: React.ComponentPropsWithoutRef<'button'>) => (
  <button type="button" {...props} />
);
