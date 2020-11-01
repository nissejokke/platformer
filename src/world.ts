import { Objct, delay } from "./common.js";
import Vector from "./vector.js";

export class World {
  objs: Objct[];
  collisionMap: Objct[][];
  collisionSize: number;
  constructor(
    private ctx: CanvasRenderingContext2D,
    private canvas: HTMLCanvasElement
  ) {
    this.objs = [];
    this.collisionMap = [];
    this.collisionSize = 100;
  }

  add(obj: Objct) {
    this.objs.push(obj);
  }

  async draw() {
    this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.resetCollisionMap();
    for (const obj of this.objs) {
      this.addForces(obj);
      this.addObjectToCollisionMap(obj);
    }
    for (const obj of this.objs) {
      this.updatePosition(obj);
      obj.draw();
    }
    await delay(100);
  }
  addForces(obj: Objct) {
    if (obj.mass !== -1)
      // Hack: change to objct type instead of mass == -1 to denote fixed object
      obj.force.add(new Vector(0, 2));
  }

  updatePosition(obj: Objct) {
    obj.x += obj.force.x;
    obj.y += obj.force.y;
  }

  resetCollisionMap() {
    for (let n = 0; n < this.collisionSize; n++) this.collisionMap[n] = [];
  }

  addObjectToCollisionMap(obj: Objct) {
    const worldWidth = this.canvas.offsetWidth;
    const worldHeight = this.canvas.offsetHeight;
    const stepX = Math.round(worldWidth / this.collisionSize);
    const stepY = Math.round(worldHeight / this.collisionSize);

    for (let x = obj.x; x < obj.x + obj.width; x += stepX) {
      for (let y = obj.y; y < obj.y + obj.height; y += stepY) {
        const xx = Math.round(this.collisionSize * (x / worldWidth));
        const yy = Math.round(this.collisionSize * (y / worldHeight));
        if (this.collisionMap[xx][yy])
          return this.collision(this.collisionMap[xx][yy], obj);
        this.collisionMap[xx][yy] = obj;
      }
    }
  }

  collision(obj1: Objct, obj2: Objct) {
    // console.log("->", obj1, obj2);
    if (obj1.mass === -1) obj2.force.y = 0;
    else if (obj2.mass === -1) obj1.force.y = 0;
  }
}
