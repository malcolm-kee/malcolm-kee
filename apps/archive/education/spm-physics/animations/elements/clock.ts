import { EventEmitter } from './event-emitter';
import {
  ConstructorByType,
  DrawingObject,
  DrawingObjectEvents,
  RenderProps,
} from './type';

export class Clock extends EventEmitter<DrawingObjectEvents>
  implements DrawingObject {
  private lastRun: Date | undefined;
  private msPassed: number = 0;
  private font: string;
  private color: string;
  private x: number;
  private y: number;

  constructor({ font, color, x, y }: ConstructorByType['clock']) {
    super();
    this.font = font;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  nextFrame() {
    if (this.lastRun) {
      const now = new Date();
      const ms = now.getTime() - this.lastRun.getTime();
      this.msPassed += ms;
      this.lastRun = now;
    } else {
      this.lastRun = new Date();
    }
  }

  pause() {
    this.lastRun = undefined;
  }

  render({ ctx }: RenderProps) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';
    ctx.fillText(`${(this.msPassed / 1000).toFixed(2)} s`, this.x, this.y);
  }

  peekPosition() {
    return [this.x, this.y] as const;
  }

  restart() {
    this.msPassed = 0;
    this.lastRun = undefined;
  }
}
