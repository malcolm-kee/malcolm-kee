import * as React from 'react';
import { FixedAccelerationSquare } from '../elements/fixed-acceleration-square';
import { AnimationContext } from './animation-context';

export type ConstantAccSquareProps = {
  initialX: number;
  initialY: number;
  initialSpeed: number;
  acceleration: number;
  size: number;
  color: string;
  withSpeedLabel: boolean;
  stopAtBoundary: boolean;
};

export const ConstantAccSquare = ({
  initialX = 0,
  initialY = 50,
  initialSpeed = 50,
  acceleration = 0,
  size = 5,
  color = 'teal',
  withSpeedLabel = false,
  stopAtBoundary = true,
}: ConstantAccSquareProps) => {
  const { register } = React.useContext(AnimationContext);

  const square = React.useMemo(
    () =>
      new FixedAccelerationSquare({
        acceleration: [acceleration, 0],
        initial: {
          speed: [initialSpeed, 0],
          position: [initialX, initialY],
        },
        size: [size, size],
        color,
        withSpeedLabel,
        stopAtBoundary,
      }),
    [
      initialX,
      initialY,
      initialSpeed,
      acceleration,
      size,
      color,
      stopAtBoundary,
    ]
  );

  React.useEffect(() => register(square), [register, square]);

  return null;
};
