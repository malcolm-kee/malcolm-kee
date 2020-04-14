import * as React from 'react';
import { Button } from '../../../src/components/Button';
import {
  SingleObjectMotion,
  SingleObjectMotionProps,
} from './motions/single-object-motion';

const useToggle = (initialState: boolean) => {
  const [on, setOn] = React.useState(initialState);
  const toggle = React.useCallback(() => setOn(x => !x), []);

  return [on, toggle, setOn] as const;
};

export const SingleObjectAnimationInner = (
  props: Omit<SingleObjectMotionProps, 'isPlaying' | 'onEnd'> & {
    className: string;
    width: number;
  }
) => {
  const [isPlaying, toggle, setIsPlaying] = useToggle(false);
  const [resetId, setResetId] = React.useState(0);
  const reset = () => {
    setResetId(x => x + 1);
    setIsPlaying(false);
  };

  return (
    <div className={props.className}>
      <SingleObjectMotion
        {...props}
        isPlaying={isPlaying}
        onEnd={reset}
        canvasWidth={props.width}
        key={resetId}
      />
      <div className="py-2 text-center">
        <Button color="primary" onClick={toggle}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </div>
    </div>
  );
};

export const SingleObjectAnimation = (
  props: Omit<SingleObjectMotionProps, 'isPlaying' | 'onEnd'>
) => {
  return (
    <>
      <SingleObjectAnimationInner
        {...props}
        width={250}
        className="md:hidden"
      />
      <SingleObjectAnimationInner
        {...props}
        width={600}
        className="hidden md:block"
      />
    </>
  );
};
