import Vector from "./vector.js";

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Mass {
  mass: number;
}

export interface Objct extends Point, Size, Mass {
  force: Vector;
  draw(): void;
  collision(obj1: Objct, obj2: Objct): void;
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
