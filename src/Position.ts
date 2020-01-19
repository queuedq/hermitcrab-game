import { Direction } from "./constants";

export class Position {
  constructor(public x: number, public y: number) {}

  moveTo(direction: Direction, distance: number = 1) {
    switch (direction) {
      case Direction.Up:
        return new Position(this.x, this.y - distance);
      case Direction.Down:
        return new Position(this.x, this.y + distance);
      case Direction.Left:
        return new Position(this.x - distance, this.y);
      case Direction.Right:
        return new Position(this.x + distance, this.y);
    }
  }

  relativeFrom(position: Position) {
    return new Position(this.x - position.x, this.y - position.y);
  }
}
