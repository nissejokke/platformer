import { Objct, delay } from "./common.js";

export class World {
  objs: Objct[];
  constructor(
    private ctx: CanvasRenderingContext2D,
    private canvas: HTMLCanvasElement
  ) {
    this.objs = [];
  }

  add(obj: Objct) {
    this.objs.push(obj);
  }

  async draw() {
    this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    for (const obj of this.objs) {
      obj.draw();
    }
    await delay(100);
  }
}
