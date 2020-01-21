import { Point } from "../core/Point";
import { Direction } from "../core/constants";

export interface Entity {
  readonly id: string;
  readonly position: Point;
  getBlocks(): Point[];
  move(dir: Direction): Entity;
}
