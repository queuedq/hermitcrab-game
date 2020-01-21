import { Point } from "../core/Point";
import { Direction } from "../core/constants";

export class Player {
  constructor(public position: Point) {}

  moveTo(dir: Direction): Player {
    return new Player(this.position.moveTo(dir));
  }
}
