import React from 'react';

export const useEventListener = (eventName, handler, element = global) => {
  const savedHandler = React.useRef();

  React.useEffect(
    () => {
      savedHandler.current = handler;
    },
    [handler]
  );

  React.useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      const eventListener = event => savedHandler.current(event);
      element.addEventListener(eventName, eventListener);
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element]
  );
};

export default useEventListener;
