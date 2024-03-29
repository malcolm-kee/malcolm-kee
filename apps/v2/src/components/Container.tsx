import * as React from 'react';
import { clsx } from 'clsx';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

const ContainerInner = ({ children, ...props }: DivProps) => (
  <div {...props} className={clsx('relative px-4 sm:px-8 lg:px-12', props.className)}>
    <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
  </div>
);

const ContainerOuter = React.forwardRef(function ContainerOuter(
  { children, className, ...props }: DivProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
): React.ReactElement {
  return (
    <div className={clsx('sm:px-8', className)} {...props} ref={forwardedRef}>
      <div className={clsx('max-w-7xl mx-auto lg:px-8')}>{children}</div>
    </div>
  );
});

export const Container = Object.assign(
  React.forwardRef(function Container(
    { children, className, ...props }: DivProps,
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ): React.ReactElement {
    return (
      <ContainerOuter {...props} className={className} ref={forwardedRef}>
        <ContainerInner>{children}</ContainerInner>
      </ContainerOuter>
    );
  }),
  {
    Inner: ContainerInner,
    Outer: ContainerOuter,
  }
);

export default Container;
