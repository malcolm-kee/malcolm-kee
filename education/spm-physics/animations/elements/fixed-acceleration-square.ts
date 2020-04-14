import { getAbs } from '../lib/get-absolute';
import { CanvasContext, ConstructorByType, DrawingObject, XandY } from './type';

export class FixedAccelerationSquare implements DrawingObject {
  private position: XandY;
  private velocity: XandY;
  private acceleration: XandY;
  private color: string;
  private size: XandY;
  private lastRun: Date | undefined;
  private withSpeedLabel: boolean;

  constructor({
    acceleration,
    initial,
    size,
    color,
    withSpeedLabel,
  }: ConstructorByType['fixed-acceleration']) {
    this.acceleration = acceleration;
    this.size = size;
    this.position = initial.position;
    this.velocity = initial.speed;
    this.color = color;
    this.withSpeedLabel = withSpeedLabel;
  }

  nextFrame() {
    if (this.lastRun) {
      const now = new Date();
      const [oldSpeedX, oldSpeedY] = this.velocity;
      const timeDiff = (now.getTime() - this.lastRun.getTime()) / 1000;
      this.velocity = [
        timeDiff * this.acceleration[0] + oldSpeedX,
        timeDiff * this.acceleration[1] + oldSpeedY,
      ];
      this.position[0] += 0.5 * (this.velocity[0] + oldSpeedX) * timeDiff;
      this.position[1] += 0.5 * (this.velocity[1] + oldSpeedY) * timeDiff;
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
    ctx.fillRect(x, y, this.size[0], this.size[1]);
    if (this.withSpeedLabel) {
      ctx.font = '24px sans serif';
      ctx.fillText(`${Math.round(getAbs(this.velocity))} m/s`, x, y);
    }
  }

  peekPosition() {
    return this.position;
  }
}
