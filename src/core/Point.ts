import { Direction } from "./constants";

export class Point {
  constructor(public x: number, public y: number) {}

  static get origin() {
    return new Point(0, 0);
  }

  moveTo(direction: Direction, distance: number = 1) {
    switch (direction) {
      case Direction.Up:
        return new Point(this.x, this.y - distance);
      case Direction.Down:
        return new Point(this.x, this.y + distance);
      case Direction.Left:
        return new Point(this.x - distance, this.y);
      case Direction.Right:
        return new Point(this.x + distance, this.y);
    }
  }

  add(p: Point) {
    return new Point(this.x + p.x, this.y + p.y);
  }

  relativeFrom(p: Point) {
    return new Point(this.x - p.x, this.y - p.y);
  }
}
