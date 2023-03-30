export interface EventEmitter<EventType> {
  addEventListener(type: EventType, callback: () => void, ...args: any[]): void;
  removeEventListener(type: EventType, callback: () => void): void;
}

export function listen<EventType extends string>(
  eventEmitter: EventEmitter<EventType>,
  type: EventType,
  callback: () => void,
  ...otherOptions: any[]
) {
  eventEmitter.addEventListener(type, callback, ...otherOptions);

  return function unlisten() {
    eventEmitter.removeEventListener(type, callback);
  };
}
