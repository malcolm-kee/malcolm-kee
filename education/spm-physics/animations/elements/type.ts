export type CanvasContext = CanvasRenderingContext2D;

export interface DrawingObject {
  nextFrame: () => void;
  pause: () => void;
  render: (ctx: CanvasContext) => void;
  peekPosition: () => Readonly<XandY>;
}

export type XandY = [number, number];

export interface ConstructorByType {
  'fixed-speed': {
    size: XandY;
    position: XandY;
    color: string;
    velocity: XandY;
  };
  'fixed-acceleration': {
    acceleration: XandY;
    initial: {
      position: XandY;
      speed: XandY;
    };
    size: XandY;
    color: string;
    withSpeedLabel: boolean;
  };
  clock: { font: string; color: string; x: number; y: number };
}

export type ConstructorEvent = {
  [key in keyof ConstructorByType]: {
    type: key;
    payload: ConstructorByType[key];
  };
}[keyof ConstructorByType];

export type WorkerEvent =
  | ConstructorEvent
  | {
      type: 'init';
      canvas: OffscreenCanvas;
      width: number;
      height: number;
      gridLine: number;
    }
  | {
      type: 'run';
    }
  | {
      type: 'pause';
    };
