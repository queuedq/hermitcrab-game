import { Entity } from "./Entity";
import { Point } from "../core/Point";
import { Direction } from "../core/constants";

export class Shell implements Entity {
  constructor(
    readonly id: string,
    readonly position: Point,
    readonly blocks: Point[],
  ) { }

  getBlocks(): Point[] {
    return this.blocks.map(block => block.add(this.position));
  }

  move(dir: Direction): Shell {
    const newPosition = this.position.moveTo(dir);
    return new Shell(this.id, newPosition, this.blocks);
  }
}
