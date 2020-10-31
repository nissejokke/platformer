export interface Point {
  x: number;
  y: number;
}

export interface HumanJoints {
  head: Point;
  neck: Point;
  leftShoulder: Point;
  leftElbow: Point;
  leftHand: Point;
  rightShoulder: Point;
  rightElbow: Point;
  rightHand: Point;
}

class Pose {
  joints: HumanJoints;
  constructor(joints: HumanJoints) {
    this.joints = joints;
  }
}

export class Man {
  poses: Pose[];
  scale: number;
  constructor(
    private ctx: CanvasRenderingContext2D,
    private x: number,
    private y: number
  ) {
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
      }),
    ];
    this.scale = 0.1;
  }

  draw() {
    this.ctx.beginPath();

    for (const pose of this.poses) {
      const joint = pose.joints;
      this.ctx.moveTo(
        this.x + joint.head.x * this.scale,
        this.y + joint.head.y * this.scale
      );
      this.ctx.lineTo(
        this.x + joint.neck.x * this.scale,
        this.y + joint.neck.y * this.scale
      );
      // left part
      this.ctx.lineTo(
        this.x + joint.leftShoulder.x * this.scale,
        this.y + joint.leftShoulder.y * this.scale
      );
      this.ctx.lineTo(
        this.x + joint.leftElbow.x * this.scale,
        this.y + joint.leftElbow.y * this.scale
      );
      this.ctx.lineTo(
        this.x + joint.leftHand.x * this.scale,
        this.y + joint.leftHand.y * this.scale
      );
      this.ctx.moveTo(
        this.x + joint.neck.x * this.scale,
        this.y + joint.neck.y * this.scale
      );
      // right part
      this.ctx.lineTo(
        this.x + joint.rightShoulder.x * this.scale,
        this.y + joint.rightShoulder.y * this.scale
      );
      this.ctx.lineTo(
        this.x + joint.rightElbow.x * this.scale,
        this.y + joint.rightElbow.y * this.scale
      );
      this.ctx.lineTo(
        this.x + joint.rightHand.x * this.scale,
        this.y + joint.rightHand.y * this.scale
      );
      this.ctx.moveTo(
        this.x + joint.neck.x * this.scale,
        this.y + joint.neck.y * this.scale
      );
      this.ctx.lineTo(this.x, this.y);
      this.ctx.stroke();
    }
  }
}
