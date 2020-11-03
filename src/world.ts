import { Objct, delay, Point, GroundMovable } from "./common.js";
import Vector from "./vector.js";

export class World {
  objs: Objct[];
  collisionMap: (Objct | undefined)[][];
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
    }
    for (const obj of this.objs) this.updatePosition(obj);
    for (const obj of this.objs) {
      this.addObjectToCollisionMap(obj);
    }
    // for (const obj of this.objs) this.updatePosition(obj);
    for (const obj of this.objs) {
      obj.draw();
    }
    await delay(25);
  }
  addForces(obj: Objct) {
    if (obj.mass !== -1)
      // Hack: change to objct type instead of mass == -1 to denote fixed object
      // Gravity
      obj.force.add(new Vector(0, 2));
  }

  updatePosition(obj: Objct) {
    obj.x += obj.force.x;
    obj.y += obj.force.y;

    // wrap y
    if (obj.y < 0) obj.y += this.canvas.offsetHeight;
    if (obj.y > this.canvas.offsetHeight) obj.y -= this.canvas.offsetHeight;

    // wrap x
    if (obj.x < 0) obj.x += this.canvas.offsetWidth;
    if (obj.x > this.canvas.offsetWidth) obj.x -= this.canvas.offsetWidth;
  }

  resetCollisionMap() {
    for (let n = 0; n < this.collisionSize; n++) this.collisionMap[n] = [];
  }

  addObjectToCollisionMap(obj: Objct, updatePhysics?: boolean) {
    const worldWidth = this.canvas.offsetWidth;
    const worldHeight = this.canvas.offsetHeight;
    const stepX = Math.round(worldWidth / this.collisionSize);
    const stepY = Math.round(worldHeight / this.collisionSize);
    // this.ctx.fillText(
    //   `${Math.round(obj.x)}x${Math.round(obj.y)} ${obj.width}:${obj.height}`,
    //   obj.x,
    //   obj.y,
    //   200
    // );

    let xval = [0, 0];
    let yval = [0, 0];
    const objPoints = [];
    for (let x = obj.x; x < obj.x + obj.width; x += stepX) {
      for (let y = obj.y; y < obj.y + obj.height; y += stepY) {
        const xx = Math.round(this.collisionSize * (x / worldWidth));
        const yy = Math.round(this.collisionSize * (y / worldHeight));

        if (x === obj.x) xval = [xx, xx];
        if (y === obj.y) yval = [yy, yy];
        if (xx > xval[1]) xval[1] = xx;
        if (yy > yval[1]) yval[1] = yy;

        if (xx >= 0 && xx < this.collisionMap.length) {
          if (this.collisionMap[xx][yy] && this.collisionMap[xx][yy] !== obj) {
            if (this.collision(this.collisionMap[xx][yy] as Objct, obj)) {
              if (updatePhysics !== false) {
                objPoints.forEach((point) => {
                  this.collisionMap[point[0]][point[1]] = undefined;
                });
                //   this.updatePosition(obj);
                this.addObjectToCollisionMap(obj, false);
              }
              return;
            }
          } else {
            this.collisionMap[xx][yy] = obj;
            objPoints.push([xx, yy]);
          }
        }
      }
    }
    // this.ctx.font = "30px serif";
    // this.ctx.fillText(
    //   `${xval.join(",")}x${yval.join(",")}`,
    //   obj.x,
    //   obj.y - 20,
    //   200
    // );
    console.log(xval, yval);
  }

  collision(obj1: Objct, obj2: Objct): boolean {
    /**
     * X and Y distance between objects
     * @param obj1
     * @param obj2
     */
    const distance = (obj1: Objct, obj2: Objct) => {
      return [
        Math.min(
          Math.abs(obj1.x + obj1.width - obj2.x),
          Math.abs(obj2.x + obj2.width - obj1.x)
        ),
        Math.min(
          Math.abs(obj1.y + obj1.height - obj2.y),
          Math.abs(obj2.y + obj2.height - obj1.y)
        ),
      ];
    };
    const isGroundMovable = (obj: any): obj is GroundMovable => {
      return "groundForce" in obj;
    };
    const interactWithFixedObject = (obj: Objct) => {
      // collision with fixed object
      obj.force.y = 0;

      // compansate for clipping into object
      //   obj.force.add(new Vector(0, -distance(obj1, obj2)[1] * 0.5));
      const dist = distance(obj1, obj2)[1];
      obj.y += -dist;
      //   obj.force.y += -dist;

      // if in concat with ground, add movement
      if (isGroundMovable(obj)) obj.force.add(obj.groundForce);

      // friction
      obj.force.x *= 0.7;
      //   if (Math.abs(obj.force.y) < 1) obj.force.y = 0;
    };

    if (obj1.mass === -1) {
      interactWithFixedObject(obj2);
      return true;
    } else if (obj2.mass === -1) {
      interactWithFixedObject(obj1);
      return true;
    } else {
      console.log("1", obj1, obj2);
      const resultForce = obj1.force
        .clone()
        .add(isGroundMovable(obj1) ? obj1.groundForce : new Vector(0, 0))
        .multiply(obj1.mass * 0.01)
        .add(isGroundMovable(obj2) ? obj2.groundForce : new Vector(0, 0))
        .add(obj2.force.multiply(obj2.mass * 0.01));
      obj1.force = resultForce;
      obj2.force = resultForce;
      return true;
    }
  }
}
