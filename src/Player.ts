import { Entity } from "./Entity";
import { Position } from "./Position";
import { Direction } from "./constants";

export class Player implements Entity {
  constructor(public position: Position) {}

  moveTo(dir: Direction): Player {
    return new Player(this.position.moveTo(dir));
  }
}
