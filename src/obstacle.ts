import { Objct } from "./common.js";

export class Obstacle implements Objct {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  draw(): void {}
}
