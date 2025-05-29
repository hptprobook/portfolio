export class Circle {
  pos: Point;
  radius: number;
  color: string;
  active: number = 0;

  constructor(pos: Point, rad: number, color: string) {
    this.pos = pos;
    this.radius = rad;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(156,217,249,${this.active})`;
    ctx.fill();
  }
}

export interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  active?: number;
  closest?: Point[];
  circle?: Circle;
}

export interface Target {
  x: number;
  y: number;
}
