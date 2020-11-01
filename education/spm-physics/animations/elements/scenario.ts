import { EventEmitter } from './event-emitter';
import { CanvasContext, DrawingObject, XandY } from './type';

type ScenarioEvents = {
  objectPause: (object: DrawingObject) => void;
};

export class Scenario extends EventEmitter<ScenarioEvents> {
  private objects: DrawingObject[];
  private _ctx: CanvasContext;
  private dimensions: XandY;
  private _gridLines: number;
  private _rafId: number | undefined;

  constructor(
    ctx: CanvasContext,
    canvasDimension: { width: number; height: number },
    options?: {
      gridLines?: number;
    }
  ) {
    super();
    this.objects = [];
    this._ctx = ctx;
    this.dimensions = [canvasDimension.width, canvasDimension.height];
    this._gridLines = (options && options.gridLines) || 0;

    this.drawGrids();
  }

  getObjects(): Readonly<DrawingObject[]> {
    return this.objects;
  }

  addObject(object: DrawingObject): () => void {
    this.objects.push(object);
    object.render({ ctx: this._ctx, boundary: this.dimensions });
    const unsub = object.addEventListener('pause', () =>
      this.emit('objectPause', object)
    );
    return () => {
      this.removeObject(object);
      unsub();
    };
  }

  removeObject(object: DrawingObject): void {
    this.objects.splice(this.objects.indexOf(object), 1);
  }

  private drawGrids() {
    if (this._gridLines) {
      const [width, height] = this.dimensions;
      const gridWidth = width / this._gridLines;
      const gridHeight = height / this._gridLines;
      this._ctx.beginPath();
      for (let i = 0; i <= width; i += gridWidth) {
        this._ctx.moveTo(i, 0);
        this._ctx.lineTo(i, height);
      }
      for (let j = 0; j <= height; j += gridHeight) {
        this._ctx.moveTo(0, j);
        this._ctx.lineTo(width, j);
      }
      this._ctx.strokeStyle = '#ababab';
      this._ctx.lineWidth = 1;
      this._ctx.stroke();
    }
  }

  tick(): void {
    this.clear();
    for (const object of this.objects) {
      object.render({ ctx: this._ctx, boundary: this.dimensions });
      object.nextFrame(this.dimensions);
    }

    this.drawGrids();
  }

  run(): void {
    this.tick();
    this._rafId = requestAnimationFrame(() => this.run());
  }

  pause(): void {
    this._rafId && cancelAnimationFrame(this._rafId);

    this.objects.forEach(object => object.pause());
  }

  clear(): void {
    this._ctx.clearRect(0, 0, this.dimensions[0], this.dimensions[1]);
  }

  restart(): void {
    this.pause();
    this.clear();
    this.objects.forEach(object => object.restart());
  }
}
