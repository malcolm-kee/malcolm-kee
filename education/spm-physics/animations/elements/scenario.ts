import { CanvasContext, DrawingObject } from './type';

export class Scenario {
  private objects: DrawingObject[];
  private _ctx: CanvasContext;
  private _width: number;
  private _height: number;
  private _gridLine: number;
  private _rafId: number | undefined;
  private onObjectHitBoundary?: (object: DrawingObject) => void;

  constructor(
    ctx: CanvasContext,
    canvasDimension: { width: number; height: number },
    options?: {
      gridLine?: number;
      onObjectHitBoundary?: (object: DrawingObject) => void;
    }
  ) {
    this.objects = [];
    this._ctx = ctx;
    this._width = canvasDimension.width;
    this._height = canvasDimension.height;
    this._gridLine = (options && options.gridLine) || 0;
    this.onObjectHitBoundary = options && options.onObjectHitBoundary;
  }

  addObject(object: DrawingObject): void {
    this.objects.push(object);
    object.render(this._ctx);
  }

  tick(): void {
    this.clear();
    this.objects.forEach(object => {
      object.render(this._ctx);
      object.nextFrame();

      if (this.onObjectHitBoundary) {
        const [x, y] = object.peekPosition();
        if (x < 0 || x > this._width || y < 0 || y > this._height) {
          this.onObjectHitBoundary(object);
          this.objects.splice(this.objects.indexOf(object), 1);
        }
      }
    });

    if (this._gridLine) {
      const gridWidth = this._width / this._gridLine;
      const gridHeight = this._height / this._gridLine;
      this._ctx.beginPath();
      for (let i = 0; i <= this._width; i += gridWidth) {
        this._ctx.moveTo(i, 0);
        this._ctx.lineTo(i, this._height);
      }
      for (let j = 0; j <= this._height; j += gridHeight) {
        this._ctx.moveTo(0, j);
        this._ctx.lineTo(this._width, j);
      }
      this._ctx.strokeStyle = '#ababab';
      this._ctx.lineWidth = 1;
      this._ctx.stroke();
    }
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
    this._ctx.clearRect(0, 0, this._width, this._height);
  }
}
