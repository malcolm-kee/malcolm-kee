import * as React from 'react';

type InitialValue<Type> = Type | (() => Type);

export const useThrottledState = <T>(
  initialValue: InitialValue<T>,
  { wait = 100 } = {}
) => {
  const [value, setValue] = React.useState(initialValue);
  const timerIdRef = React.useRef<number | undefined>(undefined);
  const latestValueRef = React.useRef<T | undefined>(undefined);

  React.useEffect(() => {
    return () => {
      window.clearTimeout(timerIdRef.current);
    };
  }, []);

  const setThrottledState = React.useCallback(
    (value: T) => {
      if (timerIdRef.current) {
        latestValueRef.current = value;
      } else {
        setValue(value);
        timerIdRef.current = window.setTimeout(() => {
          if (typeof latestValueRef.current !== 'undefined') {
            setValue(latestValueRef.current);
            latestValueRef.current = undefined;
          }
          timerIdRef.current = undefined;
        }, wait);
      }
    },
    [wait]
  );

  return [value, setThrottledState] as const;
};
