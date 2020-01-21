import { Tile, OOB } from "../Tile";
import { Entity } from "../Entity";

export class Cell {
  constructor(
    public tile: Tile | OOB,
    public entity?: Entity,
  ) { }

  static oobCell() {
    return new Cell(OOB);
  }

  isOob() {
    return this.tile === "OOB";
  }

  isBlocked() {
    return this.isOob() || this.tile === Tile.Wall;
  }
}
