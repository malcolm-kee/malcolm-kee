export type Events = {
  [key: string]: (this: null, ...args: any) => any;
};

export class EventEmitter<CustomEvents extends Events> {
  private listeners: {
    [key in keyof CustomEvents]?: Array<CustomEvents[key]>;
  };

  constructor() {
    this.listeners = {};
  }

  addEventListener<Event extends keyof CustomEvents>(
    event: Event,
    listener: CustomEvents[Event]
  ) {
    const listeners = this.listeners[event];
    if (listeners) {
      listeners.push(listener);
    } else {
      this.listeners[event] = [listener];
    }
    return () => {
      const listeners = this.listeners[event];
      if (listeners) {
        listeners.splice(listeners.indexOf(listener), 1);
      }
    };
  }

  emit<Event extends keyof CustomEvents>(
    event: Event,
    ...params: Parameters<CustomEvents[Event]>
  ) {
    const listeners = this.listeners[event];
    if (listeners) {
      listeners.forEach(listener => listener.apply(null, params));
    }
  }
}
