import { GroundMovable, Objct, Point } from "./common.js";
import Vector from "./vector.js";

export interface HumanJoints {
  head: Point;
  neck: Point;
  leftShoulder: Point;
  leftElbow: Point;
  leftHand: Point;
  rightShoulder: Point;
  rightElbow: Point;
  rightHand: Point;
  leftKnee: Point;
  leftAnkle: Point;
  leftToe: Point;
  rightKnee: Point;
  rightAnkle: Point;
  rightToe: Point;
}

export class Pose {
  joints: HumanJoints;
  constructor(joints: HumanJoints) {
    this.joints = joints;
  }
}

export class Man implements Objct, GroundMovable {
  poses: Pose[];
  scale: number;
  currentPose: number;
  x: number;
  y: number;
  width: number;
  height: number;
  mass: number;
  force: Vector;
  drawCounter: number;
  groundForce: Vector;

  constructor(private ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.poses = [
      new Pose({
        head: { x: 202, y: -267 },
        neck: { x: 161, y: -220 },
        leftShoulder: { x: 28, y: -252 },
        leftElbow: { x: -100, y: -234 },
        leftHand: { x: -62, y: -137 },
        rightShoulder: { x: 150, y: -176 },
        rightElbow: { x: 180, y: -72 },
        rightHand: { x: 249, y: -88 },
        leftKnee: { x: -60, y: 113 },
        leftAnkle: { x: -250, y: 125 },
        leftToe: { x: -353, y: 160 },
        rightKnee: { x: 79, y: 113 },
        rightAnkle: { x: 210, y: 255 },
        rightToe: { x: 285, y: 200 },
      }),
      new Pose({
        head: { x: 223, y: -243 },
        neck: { x: 161, y: -213 },
        leftShoulder: { x: 92, y: -209 },
        leftElbow: { x: -32, y: -168 },
        leftHand: { x: -62, y: -84 },
        rightShoulder: { x: 100, y: -197 },
        rightElbow: { x: 97, y: -114 },
        rightHand: { x: 191, y: -70 },
        leftKnee: { x: -31, y: 126 },
        leftAnkle: { x: -155, y: 135 },
        leftToe: { x: -229, y: 206 },
        rightKnee: { x: 66, y: 95 },
        rightAnkle: { x: 55, y: 242 },
        rightToe: { x: 148, y: 254 },
      }),
      new Pose({
        head: { x: 204, y: -277 },
        neck: { x: 138, y: -214 },
        leftShoulder: { x: 45, y: -230 },
        leftElbow: { x: -72, y: -181 },
        leftHand: { x: -24, y: -83 },
        rightShoulder: { x: 162, y: -195 },
        rightElbow: { x: 75, y: -113 },
        rightHand: { x: 218, y: -45 },
        leftKnee: { x: -78, y: 109 },
        leftAnkle: { x: -224, y: 228 },
        leftToe: { x: -158, y: 287 },
        rightKnee: { x: 128, y: 40 },
        rightAnkle: { x: 67, y: 228 },
        rightToe: { x: 128, y: 284 },
      }),
      new Pose({
        head: { x: 210, y: -282 },
        neck: { x: 139, y: -234 },
        leftShoulder: { x: 49, y: -251 },
        leftElbow: { x: -87, y: -256 },
        leftHand: { x: -82, y: -172 },
        rightShoulder: { x: 157, y: -178 },
        rightElbow: { x: 164, y: -89 },
        rightHand: { x: 265, y: -75 },
        leftKnee: { x: -90, y: 101 },
        leftAnkle: { x: -264, y: 157 },
        leftToe: { x: -308, y: 233 },
        rightKnee: { x: 130, y: 54 },
        rightAnkle: { x: 177, y: 225 },
        rightToe: { x: 269, y: 182 },
      }),
    ];
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.scale = 0.1;
    this.currentPose = 0;
    this.mass = 10;
    this.force = new Vector(0, 0);
    this.drawCounter = 0;
    this.groundForce = new Vector(0, 0);
  }
  collision(obj1: Objct, obj2: Objct): void {}

  draw() {
    // this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    const pose = this.poses[this.currentPose];
    this.ctx.beginPath();
    const joint = pose.joints;
    const direction = this.groundForce.x < 0 ? -1 : 1;
    const offsetx = this.width / 2;
    const offsety = this.height / 2;
    const x = this.x + offsetx;
    const y = this.y + offsety;
    this.ctx.arc(
      x + direction * joint.head.x * this.scale,
      y + joint.head.y * this.scale,
      50 * this.scale,
      0,
      2 * Math.PI
    );
    this.ctx.moveTo(
      x + direction * joint.neck.x * this.scale,
      y + joint.neck.y * this.scale
    );
    // left part
    this.ctx.lineTo(
      x + direction * joint.leftShoulder.x * this.scale,
      y + joint.leftShoulder.y * this.scale
    );
    this.ctx.lineTo(
      x + direction * joint.leftElbow.x * this.scale,
      y + joint.leftElbow.y * this.scale
    );
    this.ctx.lineTo(
      x + direction * joint.leftHand.x * this.scale,
      y + joint.leftHand.y * this.scale
    );
    this.ctx.moveTo(
      x + direction * joint.neck.x * this.scale,
      y + joint.neck.y * this.scale
    );
    // right part
    this.ctx.lineTo(
      x + direction * joint.rightShoulder.x * this.scale,
      y + joint.rightShoulder.y * this.scale
    );
    this.ctx.lineTo(
      x + direction * joint.rightElbow.x * this.scale,
      y + joint.rightElbow.y * this.scale
    );
    this.ctx.lineTo(
      x + direction * joint.rightHand.x * this.scale,
      y + joint.rightHand.y * this.scale
    );
    // torso
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(
      x + direction * joint.leftShoulder.x * this.scale,
      y + joint.leftShoulder.y * this.scale
    );
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(
      x + direction * joint.rightShoulder.x * this.scale,
      y + joint.rightShoulder.y * this.scale
    );
    // left leg
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(
      x + direction * joint.leftKnee.x * this.scale,
      y + joint.leftKnee.y * this.scale
    );
    this.ctx.lineTo(
      x + direction * joint.leftAnkle.x * this.scale,
      y + joint.leftAnkle.y * this.scale
    );
    this.ctx.lineTo(
      x + direction * joint.leftToe.x * this.scale,
      y + joint.leftToe.y * this.scale
    );
    // right leg
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(
      x + direction * joint.rightKnee.x * this.scale,
      y + joint.rightKnee.y * this.scale
    );
    this.ctx.lineTo(
      x + direction * joint.rightAnkle.x * this.scale,
      y + joint.rightAnkle.y * this.scale
    );
    this.ctx.lineTo(
      x + direction * joint.rightToe.x * this.scale,
      y + joint.rightToe.y * this.scale
    );
    this.ctx.stroke();
    this.ctx.closePath();
    this.drawCounter++;
    if (this.drawCounter % 5 === 0) {
      this.currentPose++;
      this.currentPose %= this.poses.length;
      this.drawCounter = 0;
    }
  }

  move(dx: number, dy: number) {
    // this.x += dx;
    // this.y += dy;
  }
}
