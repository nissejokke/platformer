import { Objct } from "./common.js";
import Vector from "./vector.js";

export class Obstacle implements Objct {
  force: Vector;
  constructor(
    private ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public mass: number
  ) {
    this.force = new Vector(0, 0);
  }
  collision(obj1: Objct, obj2: Objct): void {}

  draw(): void {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
