import { getAbs } from '../lib/get-absolute';
import { EventEmitter } from './event-emitter';
import {
  RenderProps,
  ConstructorByType,
  DrawingObject,
  XandY,
  DrawingObjectEvents,
} from './type';

export class FixedAccelerationSquare extends EventEmitter<DrawingObjectEvents>
  implements DrawingObject {
  private position: XandY;
  private velocity: XandY;
  private acceleration: XandY;
  private color: string;
  private size: XandY;
  private lastRun: Date | undefined;
  private withSpeedLabel: boolean;
  private stopAtBoundary: boolean;

  private initialPosition: XandY;
  private initialVelocity: XandY;

  constructor({
    acceleration,
    initial,
    size,
    color,
    withSpeedLabel,
    stopAtBoundary,
  }: ConstructorByType['fixed-acceleration']) {
    super();
    this.acceleration = acceleration;
    this.size = size;
    this.position = initial.position;
    this.velocity = initial.speed;
    this.color = color;
    this.withSpeedLabel = withSpeedLabel;
    this.stopAtBoundary = stopAtBoundary;

    this.initialPosition = [initial.position[0], initial.position[1]];
    this.initialVelocity = [initial.speed[0], initial.speed[1]];
  }

  nextFrame(boundary: XandY): void {
    if (this.lastRun) {
      const now = new Date();
      const [oldSpeedX, oldSpeedY] = this.velocity;
      const timeDiff = (now.getTime() - this.lastRun.getTime()) / 1000;
      const nextVx = timeDiff * this.acceleration[0] + oldSpeedX;
      const nextVy = timeDiff * this.acceleration[1] + oldSpeedY;
      const nextPositionX =
        this.position[0] + 0.5 * (nextVx + oldSpeedX) * timeDiff;
      const nextPositionY = (this.position[1] +=
        0.5 * (nextVy + oldSpeedY) * timeDiff);

      if (
        this.stopAtBoundary &&
        (nextPositionX < 0 ||
          nextPositionX > boundary[0] ||
          nextPositionY < 0 ||
          nextPositionY > boundary[1])
      ) {
        this.emit('pause');
        return;
      }

      this.velocity = [nextVx, nextVy];
      this.position = [nextPositionX, nextPositionY];
      this.lastRun = now;
    } else {
      this.lastRun = new Date();
    }
  }

  pause() {
    this.lastRun = undefined;
  }

  render({ ctx }: RenderProps) {
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

  restart() {
    this.position = this.initialPosition;
    this.velocity = this.initialVelocity;
    this.lastRun = undefined;
  }
}
