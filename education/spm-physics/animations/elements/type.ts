import { EventEmitter } from './event-emitter';

export type CanvasContext = CanvasRenderingContext2D;

export type RenderProps = {
  ctx: CanvasContext;
  boundary: XandY;
};

export type DrawingObjectEvents = {
  pause: () => void;
};

export interface DrawingObject extends EventEmitter<DrawingObjectEvents> {
  nextFrame: (boundary: XandY) => void;
  pause: () => void;
  render: (props: RenderProps) => void;
  peekPosition: () => Readonly<XandY>;
  restart: () => void;
}

export type XandY = [number, number];

export interface ConstructorByType {
  'fixed-acceleration': {
    acceleration: XandY;
    initial: {
      position: XandY;
      speed: XandY;
    };
    size: XandY;
    color: string;
    stopAtBoundary: boolean;
    withSpeedLabel: boolean;
  };
  clock: { font: string; color: string; x: number; y: number };
}
