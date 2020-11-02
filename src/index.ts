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

  // speed multiplier
  const speed = 10;

  // jump force
  const jumpForce = speed * 10;

  // ground force, applied when in concat with ground
  const groundForce = speed * 1;

  // ground force limit
  const groundForceLimit = speed * 10;

  // reduction of ground force every draw
  const groundForceReduction = 0.25;

  // air movement when changing direction
  const airForce = speed * 0.75;

  // limit air movement
  const airForceLimit = speed * 10;

  for (let n = 0; n < 2000; n++) {
    await world.draw();

    // jump
    if (keys.ArrowUp) {
      // if (man.groundForce.y > -100)
      man.groundForce.add(new Vector(0, -jumpForce));
      // else keys.ArrowUp = false;
    }
    // move right
    if (keys.ArrowRight) {
      man.groundForce.add(new Vector(groundForce, 0));
      if (man.force.x <= 0) {
        man.force.add(new Vector(airForce, 0));
        man.force.limitTo(airForceLimit);
      }
      // move left
    } else if (keys.ArrowLeft) {
      man.groundForce.add(new Vector(-groundForce, 0));
      if (man.force.x >= 0) {
        man.force.add(new Vector(-airForce, 0));
        man.force.limitTo(airForceLimit);
      }
    }

    if (man.groundForce.y < -groundForceLimit)
      man.groundForce.y = -groundForceLimit;
    man.groundForce.multiply(groundForceReduction);

    // reduce flicker when close to ground
    if (Math.abs(man.groundForce.y) < 1) man.groundForce.y = 0;
  }
}
