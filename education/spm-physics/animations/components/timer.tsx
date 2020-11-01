import * as React from 'react';
import { Clock } from '../elements/clock';
import { AnimationContext } from './animation-context';

export type TimerProps = {
  x: number;
  y: number;
  font?: string;
  color?: string;
};

export const Timer = ({
  x = 50,
  y = 50,
  font = '24px sans-serif',
  color = 'teal',
}: TimerProps) => {
  const { register } = React.useContext(AnimationContext);

  const clock = React.useMemo(
    () =>
      new Clock({
        x,
        y,
        font,
        color,
      }),
    [x, y, font, color]
  );

  React.useEffect(() => register(clock), [register, clock]);

  return null;
};
