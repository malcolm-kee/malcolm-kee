import cx from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import { getLinkTarget } from '../lib/util';
import { OutLink } from './OutLink';
import styles from './Button.module.scss';

interface BaseButtonProps {
  color?: 'primary' | 'white' | 'link';
  minWidth?: 'wide' | 'widest';
  raised?: boolean;
}

export interface NativeButtonProps
  extends BaseButtonProps,
    Omit<
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      'color'
    > {
  component?: 'button';
  type?: 'button' | 'submit' | 'reset';
}

interface LinkButtonProps
  extends BaseButtonProps,
    Omit<React.ComponentProps<typeof Link>, 'color' | 'type' | 'ref'> {
  component: typeof Link | 'a' | typeof OutLink;
}

export type ButtonProps = NativeButtonProps | LinkButtonProps;

const isButtonProps = (props: ButtonProps): props is NativeButtonProps =>
  !props.component || props.component === 'button';

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLLinkElement,
  ButtonProps
>(function Button(props, ref) {
  const className = cx(
    'py-1 px-2 rounded-lg inline-flex justify-center items-center font-sans',
    props.color === 'primary' && 'bg-primary-700 text-gray-100',
    props.color === 'white' && 'bg-gray-100 text-gray-900',
    props.color === 'link' &&
      `text-primary-700 dark:text-primary-300 ${styles.link}`,
    props.raised && 'shadow-lg',
    props.minWidth && props.minWidth === 'widest' ? 'min-w-md' : 'min-w-sm',
    props.className
  );

  if (isButtonProps(props)) {
    const { color, raised, type = 'button', minWidth, ...restProps } = props;

    return (
      <button
        {...restProps}
        type={type}
        className={className}
        ref={ref as React.Ref<HTMLButtonElement>}
      />
    );
  } else {
    const {
      color,
      raised,
      minWidth,
      component: Component,
      ...restProps
    } = props;

    return <Component {...restProps} className={className} />;
  }
});

export const LinkButton: React.FC<Omit<LinkButtonProps, 'component'>> = (
  props
) => {
  const linkTarget = getLinkTarget(props.to);
  return (
    <Button
      component={
        linkTarget === 'inner' ? Link : linkTarget === 'outer' ? OutLink : 'a'
      }
      {...props}
    />
  );
};

export type RoundedLinkButtonProps = {
  children: React.ReactNode;
  to: string;
  className?: string;
};

export const RoundedLinkButton = (props: RoundedLinkButtonProps) => {
  return (
    <Link
      to={props.to}
      className={cx(
        'inline-block text-lg sm:text-xl border-2 text-primary-800 border-primary-800 px-6 sm:px-8 py-2 rounded-full dark:text-primary-400 dark:border-primary-400',
        props.className
      )}
    >
      {props.children}
    </Link>
  );
};
