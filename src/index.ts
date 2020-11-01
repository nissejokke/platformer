import { Man } from "./man.js";
import { Obstacle } from "./obstacle.js";
import Vector from "./vector.js";
import { World } from "./world.js";

export async function draw() {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas?.getContext) return;

  const keys: Record<string, boolean> = {};
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.code === "ArrowUp") {
      if (keys[e.code] === undefined) keys[e.code] = true;
      else keys[e.code] = false;
    } else {
      // empty;
      keys[e.code] = true;
    }
    console.log(e.code);
  });

  document.addEventListener("keyup", (e: KeyboardEvent) => {
    delete keys[e.code];
  });

  var ctx = canvas.getContext("2d")!;
  const world = new World(ctx, canvas);
  const man = new Man(ctx, 250, 250);
  const ground = new Obstacle(
    ctx,
    0,
    canvas.offsetHeight - 30,
    canvas.width,
    30,
    -1
  );
  world.add(man);
  world.add(ground);

  const speed = 1;
  for (let n = 0; n < 2000; n++) {
    await world.draw();

    if (keys.ArrowUp) {
      if (man.groundForce.y > -40)
        man.groundForce.add(new Vector(0, -speed * 30));
      else keys.ArrowUp = false;
    }
    if (keys.ArrowRight) man.groundForce.add(new Vector(speed, 0));
    else if (keys.ArrowLeft) man.groundForce.add(new Vector(-speed, 0));

    console.log(man.groundForce.y);
    man.groundForce.multiply(0.5);
  }
}
