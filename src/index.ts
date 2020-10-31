import { Man } from "./man.js";

export function draw() {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas?.getContext) return;

  var ctx = canvas.getContext("2d")!;
  // ctx.beginPath();
  // const c = 50;
  // ctx.moveTo(c, c);
  // ctx.lineTo(c + 25, c + 25);
  // ctx.lineTo(c, c + 50);
  // ctx.moveTo(c, c);
  // ctx.lineTo(c - 75, c + 75);
  // ctx.stroke();
  const man = new Man(ctx, 250, 250);
  man.draw();
}
