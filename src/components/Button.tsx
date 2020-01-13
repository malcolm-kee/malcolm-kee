import cx from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import { getLinkTarget } from '../lib/util';
import { OutLink } from './OutLink';

interface BaseButtonProps {
  color?: 'primary' | 'secondary';
  size?: 'small' | 'large';
  minWidth?: 'wide' | 'widest';
  raised?: boolean;
}

interface NativeButtonProps
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

type ButtonProps = NativeButtonProps | LinkButtonProps;

const isButtonProps = (props: ButtonProps): props is NativeButtonProps =>
  !props.component || props.component === 'button';

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLLinkElement,
  ButtonProps
>(function Button(props, ref) {
  const className = cx(
    'py-1 px-2 rounded-lg inline-flex justify-center items-center',
    props.size && `btn-${props.size}`,
    props.raised && 'btn-raised',
    props.minWidth && props.minWidth === 'widest' ? 'min-w-md' : 'min-w-sm',
    props.className
  );

  if (isButtonProps(props)) {
    const {
      color,
      raised,
      type = 'button',
      size,
      minWidth,
      ...restProps
    } = props;

    return (
      <button
        {...restProps}
        className={className}
        ref={ref as React.Ref<HTMLButtonElement>}
      />
    );
  } else {
    const {
      color,
      raised,
      size,
      minWidth,
      component: Component,
      ...restProps
    } = props;

    return <Component {...restProps} className={className} />;
  }
});

export const LinkButton: React.FC<Omit<
  LinkButtonProps,
  'component'
>> = props => {
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
