import cx from 'classnames';
import * as React from 'react';

export type MainContentProps<ComponentType extends React.ElementType<any>> = {
  as: ComponentType;
  className?: string;
} & React.ComponentProps<ComponentType>;

export const MainContent = <ComponentType extends React.ElementType<any>>({
  as: Component = 'main',
  className,
  ...props
}: MainContentProps<ComponentType>) => (
  <Component
    className={cx('container mx-auto lg:pt-24', className)}
    {...props}
  />
);
