import * as React from 'react';
import { DrawingObject } from '../elements/type';

export type AnimationContextType = {
  register: (object: DrawingObject) => () => void;
  toggleRunningState: () => void;
};

function noop() {}

export const AnimationContext = React.createContext<AnimationContextType>({
  register() {
    return noop;
  },
  toggleRunningState: noop,
});

AnimationContext.displayName = 'Animation';
