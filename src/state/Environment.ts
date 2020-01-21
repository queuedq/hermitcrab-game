import { Tile } from "./Tile";
import { map2d } from "../core/helpers";
import { Point } from "../core/Point";

export type EnvironmentRep = string[][];

export class Environment {
  constructor(readonly layout: Tile[][]) { }

  at(pos: Point) {
    return this.layout[pos.y][pos.x];
  }

  static parse(rep: EnvironmentRep) { // TODO: Extract parser class
    const mapTile = (cell: string): Tile => {
      console.log(cell);
      switch (cell) {
        case "#":
          return Tile.Wall;
        case ".":
          return Tile.Floor;
        default:
          return Tile.Floor;
      }
    }

    return new Environment(map2d(rep, mapTile));
  }
}
