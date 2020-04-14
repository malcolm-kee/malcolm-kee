import { getAbs } from '../lib/get-absolute';
import { CanvasContext, ConstructorByType, DrawingObject, XandY } from './type';

export class FixedSpeedSquare implements DrawingObject {
  private width: number;
  private height: number;
  private position: XandY;
  private color: string;
  private velocity: XandY;
  private lastRun: Date | undefined;

  constructor({
    size,
    position,
    velocity,
    color = 'blue',
  }: ConstructorByType['fixed-speed']) {
    this.width = size[0];
    this.height = size[1];
    this.position = position;
    this.velocity = velocity;
    this.color = color;
    this.lastRun = undefined;
  }

  nextFrame() {
    if (this.lastRun) {
      const now = new Date();
      const secPassed = (now.getTime() - this.lastRun.getTime()) / 1000;
      this.position[0] += this.velocity[0] * secPassed;
      this.position[1] += this.velocity[1] * secPassed;
      this.lastRun = now;
    } else {
      this.lastRun = new Date();
    }
  }

  pause() {
    this.lastRun = undefined;
  }

  render(ctx: CanvasContext) {
    ctx.fillStyle = this.color;
    const [x, y] = this.position;
    ctx.fillRect(x, y, this.width, this.height);
    ctx.font = '24px sans serif';
    ctx.fillText(`${getAbs(this.velocity)} m/s`, x, y);
  }

  peekPosition() {
    return this.position;
  }
}
