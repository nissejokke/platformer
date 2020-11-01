import { Objct } from "./common.js";
import { Man } from "./man.js";
import { Obstacle } from "./obstacle.js";
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

  for (let n = 0; n < 100; n++) {
    await world.draw();
  }
}
