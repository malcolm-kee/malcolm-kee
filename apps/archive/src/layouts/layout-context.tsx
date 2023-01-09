import * as React from 'react';
import { noop } from '../helper';

export type LayoutType = 'standard' | 'workshop' | 'edu' | 'none';

export const LayoutContext = React.createContext<(type: LayoutType) => void>(
  noop
);

export const useLayout = (type: LayoutType) => {
  const setContext = React.useContext(LayoutContext);

  React.useEffect(() => {
    setContext(type);
    return () => setContext('standard');
  }, [type, setContext]);
};
