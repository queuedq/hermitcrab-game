import { Cell, Direction } from "./constants";

export class LevelState {
  constructor(public layout: Cell[][], public entities: Entity[]) {}

  moveEntity(direction: Direction) {
    this.dfsMoveEntity();
  }

  dfsMoveEntity() {}
}
