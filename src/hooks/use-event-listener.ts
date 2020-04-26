import React from 'react';

type EventHandler<EventName extends keyof WindowEventMap> = (
  event: WindowEventMap[EventName]
) => void;

export const useWindowEventListener = <EventName extends keyof WindowEventMap>(
  eventName: EventName,
  handler: EventHandler<EventName>
) => {
  const savedHandler = React.useRef<EventHandler<EventName>>(handler);

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const eventListener: EventHandler<EventName> = (event) =>
      savedHandler.current(event);
    window.addEventListener(eventName, eventListener);
    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName]);
};
