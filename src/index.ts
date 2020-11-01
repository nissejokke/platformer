import { Man } from "./man.js";
import { Obstacle } from "./obstacle.js";
import Vector from "./vector.js";
import { World } from "./world.js";

export async function draw() {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas?.getContext) return;

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
  const keys: Record<string, boolean> = {};

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    console.log(` ${e.code}`);
    keys[e.code] = true;
  });

  document.addEventListener("keyup", (e: KeyboardEvent) => {
    keys[e.code] = false;
  });

  for (let n = 0; n < 1000; n++) {
    await world.draw();

    const speed = 5;
    if (keys.ArrowUp) man.force.add(new Vector(0, -speed));
    if (keys.ArrowRight) man.force.add(new Vector(speed, 0));
    else if (keys.ArrowLeft) man.force.add(new Vector(-speed, 0));
  }
}
